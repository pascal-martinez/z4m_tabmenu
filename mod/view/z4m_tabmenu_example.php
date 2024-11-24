<?php
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
 * along with this program. If not, see <https://www.gnu.org/licenses/>.
 * --------------------------------------------------------------------
 * ZnetDK 4 Mobile Tab Menu module view (example)
 *
 * File version: 1.0
 * Last update: 11/24/2024
 */
?>
<div class="w3-content w3-section w3-border w3-border-theme">
    <div id="tab-buttons" class="w3-theme-l4">
        <button class="w3-button w3-hover-theme">Tab 1</button>
        <button class="w3-button w3-hover-theme">Tab 2</button>
        <button class="w3-button w3-hover-theme">Tab 3</button>
    </div>
    <div id="tab-contents">
        <div class="w3-container">
            <h3>Tab 1 content</h3>
        </div>
        <div class="w3-container">
            <h3>Tab 2 content</h3>
        </div>
        <div class="w3-container">
            <h3>Tab 3 content</h3>
        </div>
    </div>
</div>
<div class="w3-content w3-section w3-border w3-border-theme w3-container">
    <h3>Tab events log</h3>
    <div id="view-tabmenu-log" class="w3-monospace"></div>
</div>
<div class="w3-content w3-section">
        <button id="show-modal-with-tabmenu" class="w3-button w3-theme-action">
            <i class="fa fa-window-maximize"></i>
            Show tab menu in a modal dialog...
        </button>
</div>
<div id="modal-with-tabmenu" class="w3-modal">
    <div class="w3-modal-content w3-card-4 w3-theme-light">
        <header class="w3-container w3-theme-dark">
            <a class="close w3-button w3-xlarge w3-hover-theme w3-display-topright" href="javascript:void(0)" aria-label="<?php echo LC_BTN_CLOSE; ?>"><i class="fa fa-times-circle fa-lg" aria-hidden="true" title="<?php echo LC_BTN_CLOSE; ?>"></i></a>
            <h4>
                <i class="fa fa-folder-o fa-lg"></i>
                <span class="title">Modal with tab menu</span>
            </h4>
        </header>
        <div class="tab-buttons w3-theme-l4">
            <button class="w3-button w3-hover-theme">Tab 1</button>
            <button class="w3-button w3-hover-theme">Tab 2</button>
            <button class="w3-button w3-hover-theme">Tab 3</button>
        </div>
        <div class="tab-contents">
            <div class="w3-container">
                <h3>Tab 1 content</h3>
            </div>
            <div class="w3-container">
                <h3>Tab 2 content</h3>
            </div>
            <div class="w3-container">
                <h3>Tab 3 content</h3>
            </div>
        </div>
        <div class="w3-container w3-padding-16 w3-border-top w3-border-theme w3-theme-l4">
            <button type="button" class="cancel w3-button w3-red">
                <i class="fa fa-close fa-lg"></i> Close
            </button>
        </div>
    </div>
</div>

<script type="module">
    import { Z4M_TabMenu } from "./engine/modules/z4m_tabmenu/public/js/class/z4m_tabmenu-min.js?v1.0";
    /********************* TAB MENU VIEW *****************/
    // View: tab menu instantiated
    const viewTabMenu = new Z4M_TabMenu('#tab-buttons > button', '#tab-contents > div');
    // First tab selected
    viewTabMenu.selectFirst();
    // 'afterShow' tab menu events 
    viewTabMenu.addEventHandler('afterShow', function(tabInfos){
        $('#view-tabmenu-log').append('<p>Clicked button: <b>' + $(tabInfos.button).text() 
                + '</b>, displayed content: <b>' + $(tabInfos.content).text() + '</b></p>');
    });
    /******************** TAB MENU IN MODAL ***************/
    // Modal dialog: tab menu instantiated
    const modalTabMenu = new Z4M_TabMenu('#modal-with-tabmenu .tab-buttons > button',
            '#modal-with-tabmenu .tab-contents > div');
    // Click show modal button
    $('#show-modal-with-tabmenu').on('click', function(){
        const modal = z4m.modal.make('#modal-with-tabmenu');
        // First tab selected
        modalTabMenu.selectFirst();
        // Modal is open
        modal.open();
    });
</script>