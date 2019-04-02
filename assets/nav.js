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
    constructor({
        containerEl,
        headerEl,
        mainEl,
        footerEl,
        expandableNavEl, priorityNavEl,
        expandableHtmlClass, expandedHtmlClass }) {

      this.toggle = this.toggle.bind(this);

      this.expandedHtmlClass = expandedHtmlClass;

      this.containerEl = containerEl;
      this.headerEl = headerEl;
      this.mainEl = mainEl;
      this.footerEl = footerEl;
      this.expandableNavEl = expandableNavEl;
      this.priorityNavEl = priorityNavEl;

      this.expandableNavBottomOffset = 20;
      this.containerEl.classList.add(expandableHtmlClass);

      this.expanded = false;
      this.animationTimeout = undefined;
    }

    toggle() {
      this.expanded = !this.expanded;
      this.update();
    }

    update() {
      if (this.expanded) {
        window.clearTimeout(this.animationTimeout);

        // Hold main position
        const mainTopOffset =
          this.mainEl.getBoundingClientRect().top +
          document.documentElement.scrollTop -
          (document.documentElement.clientTop || document.body.clientTop || 0);
        this.mainEl.style.top = `${mainTopOffset}px`;
        this.mainEl.style.position = 'absolute';
        this.mainEl.style.zIndex = '0';
        this.footerEl.style.display = 'none';

        this.containerEl.classList.add(this.expandedHtmlClass);

        const expH = this.expandableNavEl.getBoundingClientRect().height;
        const prioH = this.priorityNavEl.getBoundingClientRect().height;
        const heightDifference = expH - prioH + this.expandableNavBottomOffset;

        this.headerEl.style.paddingBottom = `${heightDifference}px`;
        this.headerEl.style.zIndex = '2';

      } else {
        this.containerEl.classList.remove(this.expandedHtmlClass);
        this.headerEl.style.removeProperty('padding-bottom');

        window.clearTimeout(this.animationTimeout);

        this.animationTimeout = window.setTimeout(() => {
          this.mainEl.style.removeProperty('z-index');
          this.mainEl.style.removeProperty('position');
          this.mainEl.style.removeProperty('top');
          this.headerEl.style.removeProperty('z-index');
          this.footerEl.style.removeProperty('display');
        }, 1000);
      }
    }
  }

  const body = document.querySelector('body');
  const headerEl = document.querySelector('body > header');
  const expandableNavEl = headerEl.querySelector('nav.expandable-nav');

  if (expandableNavEl) {

    const container = new ExpandableContainer({
      containerEl: body,
      expandableHtmlClass: 'with-expandable-nav',
      expandedHtmlClass: 'with-expanded-nav',
      headerEl: headerEl,
      footerEl: document.querySelector('body > footer'),
      mainEl: document.querySelector('body > main'),
      expandableNavEl: expandableNavEl,
      priorityNavEl: headerEl.querySelector('nav.priority-nav'),
    });

    const trigger = new NavTrigger({
      triggerTemplateSelector: '#expandableNavTrigger',
      onTriggerClick: container.toggle,
    });

    headerEl.appendChild(trigger.render());

  }

}());
