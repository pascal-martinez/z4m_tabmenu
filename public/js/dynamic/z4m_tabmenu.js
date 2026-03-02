/**
 * ZnetDK, Starter Web Application for rapid & easy development
 * See official website https://mobile.znetdk.fr
 * Copyright (C) 2024 Pascal MARTINEZ (contact@znetdk.fr)
 * License GNU GPL https://www.gnu.org/licenses/gpl-3.0.html GNU GPL
 * --------------------------------------------------------------------
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 * --------------------------------------------------------------------
 * ZnetDK 4 Mobile Tab menu module JS library
 *
 * File version: 1.0
 * Last update: 11/24/2024
 */

/**
 * ZnetDK 4 Mobile Tab menu
 * Call in JavaSscript example :
 * const myTabMenu = new Z4M_TabMenu('#tab-buttons > button', '#tab-contents > div');
 * myTabMenu.select(1); // 0 based index, second tab selected
 *
 * HTML code example
 * <div id="tab-buttons">
 *     <button>Tab 1 label</button>
 *     <button>Tab 2 label</button>
 *     <button>Tab 3 label</button>
 * </div>
 * <div id="tab-contents">
 *      <div><p>Tab 1 content</p></div>
 *      <div><p>Tab 2 content</p></div>
 *      <div><p>Tab 3 content</p></div>
 * </div>
 */
class Z4M_TabMenu {
    #cssClasses = {
        hidden: 'w3-hide',
        selected: 'w3-theme-light'
    }
    #supportedEvents = ['beforeShow', 'afterShow']
    #buttons
    #contents
    #eventHandlers = []
    /**
     * Construct a new tab menu
     * @param {string} buttonsSelector The CSS selector of the tab buttons.
     * @param {string} contentsSelector CSS selector the contents to display for
     * each tab buttons
     * @returns {Z4M_TabMenu} Instance of the tab menu
     */
    constructor(buttonsSelector, contentsSelector) {
        if (typeof buttonsSelector !== 'string') {
            throw new Error('The specified buttons selector is invalid.');
        }
        if (typeof contentsSelector !== 'string') {
            throw new Error('The specified contents selector is invalid.');
        }
        const buttons = document.querySelectorAll(buttonsSelector);
        if (buttons.length === 0) {
            throw new Error("No button found for the specified selector '" + buttonsSelector + "'.");
        }
        const contents = document.querySelectorAll(contentsSelector);
        if (contents.length === 0) {
            throw new Error("No content element found for the specified selector '" + contentsSelector + "'.");
        }
        if (buttons.length !== contents.length === 0) {
            throw new Error("The number of buttons and of contents are different.");
        }
        this.#buttons = buttons;
        this.#contents = contents;
        this.#handleEvents();
    }
    /**
     * Handles tab click events.
     * When a tab is clicked, the custom event handlers are called.
     * A custom event handler is added by calling the addEventHandler method.
     */
    #handleEvents() {
        const $this = this;
        let index = 0;
        // Click a tab button
        for (const button of this.#buttons) {
            let tabIndex = index;
            button.addEventListener('click', function() {
                const handlerParamObj = {tabIndex: tabIndex, button: this,
                    content: $this.#contents[tabIndex]};
                // beforeshow event
                const responses = $this.#triggerExtraEventHandlers($this.#supportedEvents[0],
                    handlerParamObj);
                // Clicked tab is selected if no event handler returned false
                if (responses.indexOf(false) === -1) {
                    $this.select($this.#getButtonIndex(this));
                }
                // afterShow event
                $this.#triggerExtraEventHandlers($this.#supportedEvents[1], handlerParamObj);
            });
            index++;
        }
    }
    /**
     * Triggers the custom event handlers added through the addEventHandler
     * method.
     * This method is called by the handleEvents method.
     * @param {string} eventType 'beforeShow' or 'afterShow'.
     * @param {Object} eventData Clicked tab infos. Properties are:
     * - tabIndex: zero based index of the clicked tab,
     * - button: the clicked tab button element,
     * - content: the tab content element of the clicked tab.
     * @returns {Array} The boolean values returned by the custom event
     * handlers. If one event handler returns false, the tab is not selected.
     */
    #triggerExtraEventHandlers(eventType, eventData) {
        const responses = [];
        for (const handler of this.#eventHandlers) {
            if (handler.type === eventType) {
                responses.push(handler.fn.call(this, eventData));
            }
        }
        return responses;
    }
    /**
     * Returns the tab index for the specified button element
     * @param {HTMLButtonElement} buttonEl The specified button element.
     * @returns {Number} The zero based tab index or -1 if the specified button
     * is not a tab button.
     */
    #getButtonIndex(buttonEl) {
        let index = 0;
        for (const button of this.#buttons) {
            if (button === buttonEl) {
                return index;
            }
            index++;
        }
        return -1;
    }
    getButtonElement(tabIndex) {
        if (tabIndex > -1 && tabIndex < this.#buttons.length) {
            return this.#buttons[tabIndex];
        }
        throw new Error('Tab index is invalid.');
    }
    /**
     * Adds an event handler called when a tab is clicked
     * @param {string} eventType Expected value is 'beforeShow' or 'afterShow'.
     * @param {function} eventHandler A function to call for the specified event
     * type. The first argument of the function is an Object having the
     * following properties:
     * - tabIndex: zero based index of the clicked tab,
     * - button: the clicked tab button element,
     * - content: the tab content element of the clicked tab.
     * When event type is 'beforeShow', if the function returns false, the tab
     * is not selected. 
     * @returns {Number} The index of the added event handler. This index can be
     * used later to remove the event handler.
     */
    addEventHandler(eventType, eventHandler) {
        if (this.#supportedEvents.indexOf(eventType) === -1) {
            throw new Error('Event type not supported.');
        }
        if (typeof eventHandler !== 'function') {
            throw new Error('Event handler is not a function.');
        }
        const newIndex = this.#eventHandlers.length;
        this.#eventHandlers.push({
            type: eventType,
            fn: eventHandler
        });
        return newIndex;
    }
    /**
     * Removes the event handler matching the specified index
     * @param {Number} eventHandlerIndex The event handler index returned by the
     * addEventHandler method.
     */
    removeEventHandler(eventHandlerIndex) {
        if (eventHandlerIndex >= this.#eventHandlers.length || eventHandlerIndex < 0) {
            throw new Error('Event handler index is invalid.');
        }
        this.#eventHandlers.splice(eventHandlerIndex, 1);
    }
    /**
     * Selects the tab matching the specified index
     * @param {type} tabIndex Zero based index of the tab to select
     */
    select(tabIndex) {
        let index = 0;
        for (const button of this.#buttons) {
            if (tabIndex === index) {
                button.classList.add(this.#cssClasses.selected);
                this.#contents[index].classList.remove(this.#cssClasses.hidden);
            } else {
                button.classList.remove(this.#cssClasses.selected);
                this.#contents[index].classList.add(this.#cssClasses.hidden);
            }
            index++;
        }
    }
    /**
     * Selects the first tab
     */
    selectFirst() {
        this.select(0);
    }
    /**
     * Gets the selected tab index
     * @returns {Number} The zero based index of the selected tab
     */
    getSelectedIndex() {
        let index = 0;
        for (const button of this.#buttons) {
            if (button.classList.contains(this.#cssClasses.selected)) {
                return index;
            }
            index++;
        }
    }
    /**
     * Enables the specified tab
     * @param {Number} tabIndex Zero based Index of the tab to enable
     */
    enable(tabIndex) {
        const button = this.getButtonElement(tabIndex);
        button.disabled = false;
    }
    /**
     * Disables the specified tab
     * @param {Number} tabIndex Zero based Index of the tab to disable
     */
    disable(tabIndex) {
        const button = this.getButtonElement(tabIndex);
        button.disabled = true;
    }
    /**
     * Shows the specified tab
     * @param {Number} tabIndex Zero base Index of the tab to show
     */
    show(tabIndex) {
        const button = this.getButtonElement(tabIndex);
        button.classList.remove('w3-hide');
    }
    /**
     * Hides the specified tab
     * @param {Number} tabIndex Zero base Index of the tab to show
     */
    hide(tabIndex) {
        const button = this.getButtonElement(tabIndex);
        button.classList.add('w3-hide');
    }
    /**
     * Returns the tab content element matching the specified tab index.
     * @param {number} tabIndex Tab index (first tab index is 0)
     * @returns {Element} DOM element
     */
    getContentElement(tabIndex) {
        if (tabIndex < this.#contents.length) {
            return this.#contents[tabIndex];
        }
        throw new Error('Tab index is invalid.');
    }
}
export {Z4M_TabMenu};