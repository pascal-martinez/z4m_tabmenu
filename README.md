# ZnetDK 4 Mobile module: Tab menu (z4m_tabmenu)
The Tab menu module is a JavaScript library that makes developing tab menus
easier in your ZnetDK 4 Mobile App.

![Screenshot of the Menu tab example view provided by the ZnetDK 4 Mobile 'z4m_menutab' module](https://mobile.znetdk.fr/applications/default/public/images/modules/z4m_tabmenu/screenshot1.png?v1.0)

## FEATURES
- Add event handlers to execute custom JavaScript code before and after tab selection (see `addEventHandler` method),
- Remove event handlers (see `removeEventHandler` method),
- Enable / disable tabs (see `enable` and `disable` methods),
- Hide / show tabs (see `show` and `hide` methods),
- Select a tab (see `select` method),
- Get the selected tab (see `getSelectedIndex` method).

## LICENCE
This module is published under the version 3 of GPL General Public Licence.

## REQUIREMENTS
- [ZnetDK 4 Mobile](/../../../znetdk4mobile) version 2.0 or higher,
- **PHP version 7.4** or higher,

## INSTALLATION
1. Add a new subdirectory named `z4m_tabmenu` within the
[`./engine/modules/`](/../../../znetdk4mobile/tree/master/engine/modules/) subdirectory of your
ZnetDK 4 Mobile starter App,
2. Copy module's code in the new `./engine/modules/z4m_tabmenu/` subdirectory,
or from your IDE, pull the code from this module's GitHub repository,
3. IN OPTION, if you want to see an example of tab menu in action, edit the App's [`menu.php`](/../../../znetdk4mobile/blob/master/applications/default/app/menu.php)
located in the [`./applications/default/app/`](/../../../znetdk4mobile/tree/master/applications/default/app/)
subfolder and add the following code to add a menu item for the `z4m_tabmenu_example.php` view.
```php
\MenuManager::addMenuItem(NULL, 'z4m_tabmenu_example', 'Tab menu example', 'fa-folder-o');
```
Go to the **Tab menu example** menu to see the example of tab menus in action.

## USAGE
### First step
To add a menu tab in a view or a modal dialog, adds the following HTML code.
```html
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
<script type="module">
    import { Z4M_TabMenu } from "./engine/modules/z4m_tabmenu/public/js/class/z4m_tabmenu-min.js?v1.0";
    const viewTabMenu = new Z4M_TabMenu('#tab-buttons > button', '#tab-contents > div');    
    viewTabMenu.selectFirst(); // First tab selected
</script>
```
### Click tab events
To add an event handler executed when a menu tab is selected, call the `addEventHandler` method as shown below:
```js
const eventHandlerId = viewTabMenu.addEventHandler('beforeShow', function(tabInfos) {
    console.log(tabInfos);
    return true; // Tab is selected
});
```
> [!IMPORTANT]
> To cancel a tab selection, return `false` from the `beforeShow` event handler.

To remove an event handler, call the `removeEventHandler` method as shown below.
```js
viewTabMenu.removeEventHandler(eventHandlerId);
```

### Enable / disable tabs
To enable a menu tab previously disabled, call the `enable` method as shown below.
```js
viewTabMenu.enable(1); // Second tab is enabled
```

To disable a menu tab, call the `disable` method as shown below.
```js
viewTabMenu.disable(1); // Second tab is disabled
```

### Show / hide tabs
To show a menu tab previously hidden, call the `show` method as shown below.
```js
viewTabMenu.show(2); // Third tab is shown
```

To disable a menu tab, call the `disable` method as shown below.
```js
viewTabMenu.hide(2); // Third tab is hidden
```

### Select a tab
To select a menu tab, call the `select` method as shown below:
```js
viewTabMenu.select(1); // Second tab is selected
```

To select the first menu tab, call the `selectFirst` method as shown below:
```js
viewTabMenu.selectFirst(); // First tab is selected
```

To get the current selected tab, call the `getSelectedIndex` method as shown below:
```js
const selectedTabIdx = viewTabMenu.getSelectedIndex();
```

## CHANGE LOG
See [CHANGELOG.md](CHANGELOG.md) file.

## CONTRIBUTING
Your contribution to the **ZnetDK 4 Mobile** project is welcome. Please refer to the [CONTRIBUTING.md](https://github.com/pascal-martinez/znetdk4mobile/blob/master/CONTRIBUTING.md) file.
