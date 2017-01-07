import { injectConnect, injectSelectors } from '../di/containerHelpers';
import UserProfileComponent from '../components/UserProfileComponent.jsx';
import ComplicatedService from '../services/ComplicatedService';
import { fetchUserProfile } from '../actionCreators/user';
import { USER_SELECTOR_ID } from '../reducers/user';

const mapStateToProps = (state, ownProps, injectedUserSelector) => {
    const user = injectedUserSelector(state);
    return {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
    }
};
const injectedStateToProps = injectSelectors([USER_SELECTOR_ID])(mapStateToProps);

const mapDispatchToProps = {
    fetchUserProfile: fetchUserProfile
};

export default injectConnect({}, [ ComplicatedService ], null, injectedStateToProps, mapDispatchToProps)(UserProfileComponent);