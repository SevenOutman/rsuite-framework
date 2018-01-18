const DefaultLayout = require('./layouts/default');
let _layouts = {
  default: DefaultLayout,
};

export function registerLayouts(layouts) {
  Object.assign(_layouts, layouts);
}

function layout(layoutName) {
  const Layout = _layouts[layoutName];
  if (!Layout) {
    console.error('Cannot find layout ' + layoutName)
    return DefaultLayout;
  }
  return Layout;
}

const View = {
  layout,
};

export default View;
