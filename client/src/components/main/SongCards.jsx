import React from 'react';
import SongCard from './SongCard';

let QueueCards=(props)=>{
    let {reRenderQueue,queue}=props
    if(queue.length==0){
        return <div>No Song found</div>
    }
    return queue.map(songInfo => (
            <SongCard
              styles="mb-1"
              songInfo={songInfo}
              key={songInfo.id}
              reRenderQueue={reRenderQueue}
            />
          ))
}

let SearchCards=(props)=>{
    let {searchList,reRenderQueue,queue,show,submitted}=props
    if(!show) return <div/>
    if(!submitted){
        return <div>Press Enter to search for new Songs</div>
    }
    if(submitted && searchList===null){
        return <div>Searching...</div>
    }
    if(submitted && searchList.length===0){
        return <div>No Song Found</div>
    }
    else{
        return (
        <div>
        <div>New Songs:</div>
        {searchList.map(songInfo => {
            if(queue.some(
              song => song.id === songInfo.id && songInfo.upvotes !== 0
            )) return <div/>
            return <SongCard
              addNew
              styles="mb-1"
              songInfo={songInfo}
              key={songInfo.id}
              reRenderQueue={reRenderQueue}
            />
        })}
        </div>
        
        )
    }
}

export {
    QueueCards,
    SearchCards
}