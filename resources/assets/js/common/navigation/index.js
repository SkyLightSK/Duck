// import libs
import {connect} from 'react-redux'

// import component
import Page from './Page'

const mapStateToProps = state => {
    return {
        isAuthenticated : state.Auth.isAuthenticated,
        userName : state.Auth.user.name,
        userEmail : state.Auth.user.email,
        userAvatar : state.Auth.user.avatar
    }
};

export default connect(mapStateToProps)(Page)