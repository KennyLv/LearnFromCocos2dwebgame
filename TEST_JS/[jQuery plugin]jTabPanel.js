/*!
* jTabPanel JavaScript Library v1.0.0
* http://plugins.jquery.com/project/jTabPanel
*
* Copyright 2010, Enovatics
* Licensed under the GPL Version 2 license.
* http://www.gnu.org/licenses/gpl-2.0.html
*
*
* Author : Nicolas VIEL
*
* Date: Thu Apr 27 23:49:55 2010
*/

function TabPanelParameters(tabPrefix, panelPrefix, tabCount, enableTimers) {
    this.tabOverTimer = undefined;
    this.tabOutTimer = undefined;
    this.panelOutTimer = undefined;
    this.fixedPanelId = undefined;
    this.displayedPanelId = undefined;
    this.tabCount = tabCount;
    this.tabPrefix = tabPrefix;
    this.panelPrefix = panelPrefix;
    this.enableTimers = enableTimers,
    this.timerDelay = 1000;
    this.onSelectedIndexChanged = undefined;

    this.merge = function(parameters) {
        this.mergeProperty(parameters, 'tabCount');
        this.mergeProperty(parameters, 'tabPrefix');
        this.mergeProperty(parameters, 'panelPrefix');
        this.mergeProperty(parameters, 'enableTimers');
        this.mergeProperty(parameters, 'timerDelay');
        this.mergeProperty(parameters, 'onSelectedIndexChanged');
    }

    this.mergeProperty = function(parameters, propertyName) {
        //alert(propertyName);
        var propertyValue = eval('parameters.' + propertyName);
        if (propertyValue != undefined) {
            eval('this.' + propertyName + ' = parameters.' + propertyName);
        }
    }
}

function TabPanel(params) {
    this.initParams = params;
    this.p = new TabPanelParameters(); //new TabPanelParameters(tabPrefix, panelPrefix, tabCount, enableTimers);

    this.initialize = function() {
        this.p.merge(this.initParams);
        for (var i = 1; i <= this.p.tabCount; i++) {
            var tabId = this.p.tabPrefix + i.toString();
            var panelId = this.p.panelPrefix + i.toString();
            var instance = this;

            jQuery('#' + tabId).click(function() { instance.tab_OnClick(this); });
            jQuery('#' + tabId).mouseover(function() { instance.tab_OnMouseOver(this); });
            jQuery('#' + tabId).mouseout(function() { instance.tab_OnMouseOut(this); });

            jQuery('#' + panelId).mouseover(function() { instance.panel_OnMouseOver(); });
            jQuery('#' + panelId).mouseout(function() { instance.panel_OnMouseOut(); });

            if (jQuery('#' + panelId).attr('defaultPanel') == 'defaultPanel') {
                this.p.fixedPanelId = panelId;
            }

            var subPanelId = jQuery('#' + panelId).attr('subPanelId');
            if (subPanelId != undefined && jQuery('#' + subPanelId).attr('subPanelInitialized') == undefined) {
                jQuery('#' + subPanelId).mouseover(function() { instance.panel_OnMouseOver(); });
                jQuery('#' + subPanelId).mouseout(function() { instance.panel_OnMouseOut(); });
                jQuery('#' + subPanelId).attr('subPanelInitialized', 'true');
            }
        }

        if (this.p.fixedPanelId == undefined && this.p.tabCount > 0) {
            this.showPanel(this.p.panelPrefix + '1', true);
        }
        else if (this.p.fixedPanelId != undefined) {
            this.showPanel(this.p.fixedPanelId, true);
        }
    }

    this.hideAllPanels = function() {
        for (var i = 1; i <= this.p.tabCount; i++) {
            jQuery('#' + this.p.panelPrefix + i.toString()).css("display", "none");

            var subPanelId = jQuery('#' + this.p.panelPrefix + i.toString()).attr('subPanelId');
            if (subPanelId != undefined) {
                jQuery('#' + subPanelId).css("display", "none");
            }
        }
    }

    this.showPanel = function(elementId, fixIt) {
        var lastSelectedIndex = 0;
        if (this.p.displayedPanelId != undefined) {
            lastSelectedIndex = eval(this.p.displayedPanelId.replace(this.p.panelPrefix, ''));
        }
        var selectedIndex = eval(elementId.replace(this.p.panelPrefix, ''));

        this.hideAllPanels();
        jQuery('#' + elementId).css("display", "block");
        this.p.displayedPanelId = elementId;

        var subPanelId = jQuery('#' + elementId).attr('subPanelId');

        if (subPanelId != undefined) {
            jQuery('#' + subPanelId).css("display", "block");
        }

        if (fixIt) {
            this.p.fixedPanelId = elementId;
        }

        this.clearMouseOutTimers();

        if (this.p.onSelectedIndexChanged != undefined) {
            this.p.onSelectedIndexChanged(lastSelectedIndex, selectedIndex);
        }
    }

    this.clearMouseOutTimers = function() {
        if (this.p.panelOutTimer != undefined) {
            clearTimeout(this.p.panelOutTimer);
            this.p.panelOutTimer = undefined;
        }

        if (this.p.tabOutTimer != undefined) {
            clearTimeout(this.p.tabOutTimer);
            this.p.tabOutTimer = undefined;
        }
    }

    this.tab_OnClick = function(element) {
        var i = element.id.replace(this.p.tabPrefix, '');
        this.showPanel(this.p.panelPrefix + i, true);
    }

    this.tab_OnMouseOver = function(element) {
        var i = element.id.replace(this.p.tabPrefix, '');
        var instance = this;
        
        if (this.p.enableTimers) {
            this.p.tabOverTimer = setTimeout(function() { instance.showPanel(instance.p.panelPrefix + i, false) }, this.p.timerDelay);
        }

        this.clearMouseOutTimers();
    }

    this.tab_OnMouseOut = function(element) {
        var i = element.id.replace(this.p.tabPrefix, '');
        var instance = this;
        clearTimeout(this.p.tabOverTimer);

        if (this.p.fixedPanelId != this.p.panelPrefix + i) {
            if (this.p.enableTimers) {
                this.p.tabOutTimer = setTimeout(function() { instance.showPanel(instance.p.fixedPanelId, false) }, this.p.timerDelay);
            }
        }
    }

    this.panel_OnMouseOut = function() {
        var instance = this;

        if (this.p.enableTimers) {
            this.p.panelOutTimer = setTimeout(function() { instance.showPanel(instance.p.fixedPanelId, false) }, this.p.timerDelay);
        }
    }

    this.panel_OnMouseOver = function() {
        this.clearMouseOutTimers();
    }
}
