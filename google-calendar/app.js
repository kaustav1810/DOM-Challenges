// create the calendar
function Calendar(calendarEl){

    let calendar = document.querySelector(calendarEl);

    let eventSection = document.createElement('div');
    
    
    init();

    // function to initialise the calendar

    function init(params) {
        let container = document.createElement('div');

        container.classList.add('container');
        

        // creating two sections for displaying timings and events separately

        let hours = document.createElement('div');

        hours.classList.add('hours');
        

        eventSection.classList.add('events');

        // pushing 24 hrs timing in an array to display in calendar
        let clock = [...Array(24).keys()].map((hour)=>{
            let part = hour>=12? 'PM':'AM';

            hour = hour>12?hour-12:hour;

            return `${hour}:00 ${part}`
        })

        // to display calendar timings
        for(let i=0;i<24;i++){
            let node = document.createElement('div');

            node.classList.add('row');

            let time = document.createElement('div');

            time.classList.add('time');

            time.innerHTML = clock[i];

            node.appendChild(time);

            hours.appendChild(node);
        }

        // creating blank events corresponding to calendar timings
        for(let i=0;i<24;i++){
            let node = document.createElement('div');

            node.classList.add('row');

            eventSection.appendChild(node);
        }

        // appending calendar timings and events sections to parent element
        container.appendChild(hours)
        container.appendChild(eventSection)
        calendar.appendChild(container);


        showEvents(sortEvents(events));
     
    }

    // function to show events in calendar
    function showEvents(events){
        
        let queue = [];

        events.forEach(event=>{
            let eventDiv = document.createElement('div');

            eventDiv.classList.add('card');

            // height of each event calculated based on event length
            eventDiv.style.height = `${getTimeDiff(event)}px`;

            // to calculate no. of conflicting events in that timeframe
            let overlaps = getOverlaps(queue,event.startHour,event.startMin);

            eventDiv.style.position = 'absolute'

            // for conflicting events,width of subsequent events 
            // is reduced based on no. of conflicts 
            eventDiv.style.width = `calc(${Math.round(100/(overlaps+1))}%)`;

            eventDiv.style.zIndex = overlaps;

            queue.push({endHour:event.endHour,endMin:event.endMin})

            // each event is absolute positioned from top based on startTime
            eventDiv.style.top = `${(parseInt(event.startHour)*60+parseInt(event.startMin))*40/60}px`;

            eventDiv.innerHTML = `<p>${event.title}</p> <p>${convertTime(event)}</p>`

            eventDiv.style.backgroundColor = event.color;

            eventSection.appendChild(eventDiv);
        })

    }

    // to calculate total time diff between startTime and endTime in minutes
    function getTimeDiff({startHour,startMin,endHour,endMin}) {
            console.log(((endHour-startHour)*60+ (endMin-startMin))*40/60);

        return ((endHour-startHour)*60+ (endMin-startMin))*40/60;
    }

    // to display event timings in human readable format in event cards
    function convertTime({startHour,startMin,endHour,endMin}){
        let part1,part2;

        part1=part2='am'


        if(startHour>=12){
            part1 = 'pm';
            startHour = startHour-12;
        }
        
        if(endHour>=12){
            part2 = 'pm';
            endHour = endHour-12;
        }

        startHour = startHour==0?`${startHour}0`:startHour;
        endHour = endHour==0?`${endHour}0`:endHour;
        startMin = startMin==0?`${startMin}0`:startMin;
        endMin = endMin==0?`${endMin}0`:endMin;

        return `${startHour}:${startMin} ${part1} - ${endHour}:${endMin} ${part2}`
    }

    // function to sort events in ascending order based on endTime
    function sortEvents(events) {
        let sortedEvents = events.map(({startTime,endTime,color,title})=>{
            let startHour = parseInt(startTime.split(':')[0]);
            let startMin = parseInt(startTime.split(':')[1]);
            let endHour = parseInt(endTime.split(':')[0]);
            let endMin = parseInt(endTime.split(':')[1]);

            return{startHour,startMin,endHour,endMin,color,title};
        })
        .sort((first,second)=>{
            if(first.endHour>second.endHour) return 1;
            
            else if(first.endHour===second.endHour) return first.endMin-second.endMin;

            else return -1;
        })

        return sortedEvents;
    }

    // function to calculate no. of conflicting events in a particular timeframe
    function getOverlaps(queue,startHour,startMin){
        
        // if no conflicting events yet found,queue will be empty
        if(queue.length===0) return 0;

        /*since events are sorted in asc based on endTime,
        if startHour of next event < endHour of previous event,both are conflicting events
        so we return current queue length which gives us the no. of conflicts,
        otherwise we pop elements from queue*/

        while(queue.length>0 && isAfter(queue[0].endHour,queue[0].endMin,startHour,startMin)) queue.shift();

        return queue.length;
    }

    function isAfter(hour1,min1,hour2,min2) {
        if(hour2>hour1) return true;

        if(hour1===hour2) return min2>min1;
    }
}

Calendar('#calendar')