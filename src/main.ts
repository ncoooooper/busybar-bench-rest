import {desk,duration} from "@shared/desk";
import {wrap} from "@shared/surface";
type SetEntry={kg:number;reps:number;rest:number};type S={kg:number;reps:number;editReps:boolean;since:number;sets:SetEntry[];browse:boolean;idx:number};
desk<S>({name:"Bench Rest",accent:"#B695F0",motion:{"motif":"cells","color":"#B695F0","shine":"#F8E8FF"},initial:()=>({kg:20,reps:8,editReps:false,since:0,sets:[],browse:false,idx:0}),
 render:(s,now)=>{const entry=s.sets[s.idx];return {title:s.browse?"Set history":s.since?"Rest":s.editReps?"Reps":"Working weight",
 value:s.browse&&entry?entry.kg+"x"+entry.reps:s.since?duration(now-s.since):s.editReps?String(s.reps):s.kg+" kg",
 lines:["Set "+(s.browse?s.idx+1:s.sets.length+1),"Load "+s.kg+" kg / "+s.reps+" reps",entry?"Recorded rest "+duration(entry.rest):"No sets logged",
 "Click: log set / end rest","Start: weight or reps","Hold OK: history"]};},
 action:(s,k,now)=>{if(k==="hold-ok"&&s.sets.length){s.browse=!s.browse;s.idx=s.sets.length-1;return;}
 if(s.browse){if(k==="up"||k==="down")s.idx=wrap(s.idx+(k==="up"?1:-1),s.sets.length);if(k==="ok")s.browse=false;return;}
 if(k==="ok"){if(s.since){s.sets[s.sets.length-1].rest=Math.max(0,now-s.since);s.since=0;}else{s.sets=s.sets.concat([{kg:s.kg,reps:s.reps,rest:0}]).slice(-20);s.idx=s.sets.length-1;s.since=now;}}
 if(k==="start")s.editReps=!s.editReps;if(!s.since&&(k==="up"||k==="down")){const v=k==="up"?1:-1;if(s.editReps)s.reps=Math.max(1,Math.min(99,s.reps+v));else s.kg=Math.max(0,Math.min(500,s.kg+2.5*v));}},
 ticking:s=>Boolean(s.since&&!s.browse)});
