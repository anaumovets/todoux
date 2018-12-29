const daylength = 24*3600000;
const date2day = date => Math.floor(date/daylength);

export function isSingle(item) {
    return (item.doable || (!item.yearly && !item.monthly && !item.weekly));
}

export function isVisible(item) {
    return isSingle(item) || ((item.id + '').indexOf('.') !== -1);
}

export function getSourceId(id) {
    const instanceidx = (id + '').indexOf('.');
    if(instanceidx === -1)
        return id;
    const idx = parseInt(id.substring(0, instanceidx));
    return idx;
}

export function populate(items) {
    let resitems = [];

    items.forEach(item => {
        resitems = resitems.concat(getInstances(item));
    });

    return resitems;
}

export function getInstances(item, mindate, maxdate) {
    let instances = [item];
    if(isSingle(item))
        return instances;

    let inst = 0;
    for(let date = item.date; date2day(date) <= date2day(maxdate); 
        date = nextDate(item, date), ++inst)
    {
        const day = date2day(date);
        if(day < date2day(mindate)) continue;

        let nextitem = {...item, date:date};
        nextitem.id = ''+item.id+'.'+inst;
        instances.push(nextitem);
    }

    //console.log('insts: '+instances.map((i)=>(new Date(i.date)).toDateString()));
    return instances;
}

export function createNextInstance(item)
{
    let newitem = {...item};
    newitem.done = false;
    delete newitem.donedate;
    newitem.date = nextDate(item, item.date);

    const instanceidx = newitem.id.indexOf('.');
    const idx = parseInt(newitem.id.substring(instanceidx)) + 1;
    newitem.id = newitem._id.substring(0, instanceidx) + '.' + idx;
    return newitem; 
}

function nextDate(item, date)
{
    if(item.interval)
        return date + item.interval;

    if(item.yearly) {
        date = new Date(date);
        let next = new Date(date.getFullYear() + 1, date.getMonth(), date.getDate(), 
                            date.getHours(), date.getMinutes(), date.getSeconds());
        return next.valueOf();
    }

    if(item.monthly) {
        date = new Date(date);
        const month = (date.getMonth() + 1)%12;
        let year = date.getFullYear();
        if(month === 0)
            year += 1;

        let next = new Date(year, month, date.getDate(), 
                            date.getHours(), date.getMinutes(), date.getSeconds());
                            console.log('next ', next.toDateString());
        return next.valueOf();
    }

    if(item.weekly) {
        let next;// = new Date(date + daylength);
        for(let daycount  = 1; daycount <= 7; ++daycount) {
            next =  new Date(date + daycount*daylength);
            if(item.weekdays && item.weekdays[next.getDay()])
                break;
        }

        return next.valueOf();
    }

    return 0;
}