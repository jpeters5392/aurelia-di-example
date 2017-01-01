import { injectConnect } from '../di/containerHelpers';
import UserProfileComponent from '../components/UserProfileComponent.jsx';
import ComplicatedService from '../services/ComplicatedService';
import { fetchUserProfile } from '../actionCreators/user';

const mapStateToProps = (state) => {
    return {
        firstName: state.user.user.firstName,
        lastName: state.user.user.lastName,
        email: state.user.user.email
    }
};

const mapDispatchToProps = {
    fetchUserProfile: fetchUserProfile
};

export default injectConnect({}, [ ComplicatedService ], null, mapStateToProps, mapDispatchToProps)(UserProfileComponent);