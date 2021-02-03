import Layout from './Layout';

import withUser from '../GetUser';

const LayoutComponent = withUser(Layout);

export default LayoutComponent;
