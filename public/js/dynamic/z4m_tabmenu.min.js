class Z4M_TabMenu{#cssClasses={hidden:'w3-hide',selected:'w3-theme-light'}
#supportedEvents=['beforeShow','afterShow']
#buttons
#contents
#eventHandlers=[]
constructor(buttonsSelector,contentsSelector){if(typeof buttonsSelector!=='string'){throw new Error('The specified buttons selector is invalid.')}
if(typeof contentsSelector!=='string'){throw new Error('The specified contents selector is invalid.')}
const buttons=document.querySelectorAll(buttonsSelector);if(buttons.length===0){throw new Error("No button found for the specified selector '"+buttonsSelector+"'.")}
const contents=document.querySelectorAll(contentsSelector);if(contents.length===0){throw new Error("No content element found for the specified selector '"+contentsSelector+"'.")}
if(buttons.length!==contents.length===0){throw new Error("The number of buttons and of contents are different.")}
this.#buttons=buttons;this.#contents=contents;this.#handleEvents()}
#handleEvents(){const $this=this;let index=0;for(const button of this.#buttons){let tabIndex=index;button.addEventListener('click',function(){const handlerParamObj={tabIndex:tabIndex,button:this,content:$this.#contents[tabIndex]};const responses=$this.#triggerExtraEventHandlers($this.#supportedEvents[0],handlerParamObj);if(responses.indexOf(!1)===-1){$this.select($this.#getButtonIndex(this))}
$this.#triggerExtraEventHandlers($this.#supportedEvents[1],handlerParamObj)});index++}}
#triggerExtraEventHandlers(eventType,eventData){const responses=[];for(const handler of this.#eventHandlers){if(handler.type===eventType){responses.push(handler.fn.call(this,eventData))}}
return responses}
#getButtonIndex(buttonEl){let index=0;for(const button of this.#buttons){if(button===buttonEl){return index}
index++}
return-1}
getButtonElement(tabIndex){if(tabIndex>-1&&tabIndex<this.#buttons.length){return this.#buttons[tabIndex]}
throw new Error('Tab index is invalid.')}
addEventHandler(eventType,eventHandler){if(this.#supportedEvents.indexOf(eventType)===-1){throw new Error('Event type not supported.')}
if(typeof eventHandler!=='function'){throw new Error('Event handler is not a function.')}
const newIndex=this.#eventHandlers.length;this.#eventHandlers.push({type:eventType,fn:eventHandler});return newIndex}
removeEventHandler(eventHandlerIndex){if(eventHandlerIndex>=this.#eventHandlers.length||eventHandlerIndex<0){throw new Error('Event handler index is invalid.')}
this.#eventHandlers.splice(eventHandlerIndex,1)}
select(tabIndex){let index=0;for(const button of this.#buttons){if(tabIndex===index){button.classList.add(this.#cssClasses.selected);this.#contents[index].classList.remove(this.#cssClasses.hidden)}else{button.classList.remove(this.#cssClasses.selected);this.#contents[index].classList.add(this.#cssClasses.hidden)}
index++}}
selectFirst(){this.select(0)}
getSelectedIndex(){let index=0;for(const button of this.#buttons){if(button.classList.contains(this.#cssClasses.selected)){return index}
index++}}
enable(tabIndex){const button=this.getButtonElement(tabIndex);button.disabled=!1}
disable(tabIndex){const button=this.getButtonElement(tabIndex);button.disabled=!0}
show(tabIndex){const button=this.getButtonElement(tabIndex);button.classList.remove('w3-hide')}
hide(tabIndex){const button=this.getButtonElement(tabIndex);button.classList.add('w3-hide')}
getContentElement(tabIndex){if(tabIndex<this.#contents.length){return this.#contents[tabIndex]}
throw new Error('Tab index is invalid.')}}
export{Z4M_TabMenu}