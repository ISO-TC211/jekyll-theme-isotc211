(function () {
  var viewer = document.querySelector('.two-pane-viewer');

  if (viewer) {
    var browser = viewer.querySelector('.browser.bp3-tree');
    var iframe = viewer.querySelector('.viewer iframe');
    if (browser && iframe) {

      function selectItem (item) {
        for (var el of browser.querySelectorAll('a')) {
          el.classList.remove('selected');
        }
        item.classList.add('selected');
      }

      for (var el of browser.querySelectorAll('.bp3-tree-node-label a')) {
        el.addEventListener('click', function (evt) {
          selectItem(evt.target);
          evt.preventDefault();
          iframe.setAttribute('src', evt.target.getAttribute('href'));
          return false;
        });
      }
    }
  }
}());
