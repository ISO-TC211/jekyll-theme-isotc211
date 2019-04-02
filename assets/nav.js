(function () {

  // Requires accompanying CSS rules, based on classes on main container
  // (body) that style header, menu and trigger button.
  // Container classes used: .with-expandable-nav, .with-expanded-nav

  class NavTrigger {
    constructor({ triggerTemplateSelector, onTriggerClick }) {
      this.onTriggerClick = onTriggerClick;
      this.triggerTemplate = document.querySelector(`${triggerTemplateSelector}`);
      this.triggerEl = document.importNode(this.triggerTemplate.content, true);
    }

    render() {
      const wrapper = this.triggerEl.children[0];
      wrapper.addEventListener('click', this.onTriggerClick);
      return wrapper;
    }
  }

  class ExpandableContainer {
    constructor({ containerEl, expandableHtmlClass, expandedHtmlClass }) {
      this.toggle = this.toggle.bind(this);

      this.expandedHtmlClass = expandedHtmlClass;
      this.containerEl = containerEl;
      this.containerEl.classList.add(expandableHtmlClass);

      this.expanded = false;
    }

    toggle() {
      this.expanded = !this.expanded;
      this.update();
    }

    update() {
      if (this.expanded) {
        this.containerEl.classList.add(this.expandedHtmlClass);
      } else {
        this.containerEl.classList.remove(this.expandedHtmlClass);
      }
    }
  }

  class SiteHeader {
    constructor({ headerEl }) {
      this.headerEl = headerEl;
      this.expandableNavEl = headerEl.querySelector('nav.expandable-nav');
      this.priorityNavEl = headerEl.querySelector('nav.priority-nav');
      this.expandableNavBottomOffset = 20;
    }
    expand() {
      if (this.expandableNavEl) {
        const expH = this.expandableNavEl.getBoundingClientRect().height;
        const prioH = this.priorityNavEl.getBoundingClientRect().height;

        headerEl.style.paddingBottom = `${expH - prioH + this.expandableNavBottomOffset}px`;
        console.debug(headerEl.style.paddingBottom);
      }
    }
    collapse() {
      if (this.expandableNavEl) {
        headerEl.style.removeProperty('padding-bottom');
      }
    }
  }

  const body = document.querySelector('body');
  const headerEl = document.querySelector('body > header');

  const header = new SiteHeader({ headerEl: headerEl });

  const container = new ExpandableContainer({
    containerEl: body,
    expandableHtmlClass: 'with-expandable-nav',
    expandedHtmlClass: 'with-expanded-nav',
  });

  const trigger = new NavTrigger({
    triggerTemplateSelector: '#expandableNavTrigger',
    onTriggerClick: () => {
      container.toggle();
      container.expanded ? header.expand() : header.collapse();
    },
  });

  headerEl.appendChild(trigger.render());

}());
