import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Profile from './github/Profile.jsx';
import Search from './github/Search.jsx';

class App extends Component {
    handleFormSubmit(username) {
        this.setState({username: username}, function () {
            this.getUserData();
            this.getUserRepos();
        })
    }

    constructor(props) {
        super(props);
        this.state = {
            username: 'andreighervan',
            userData: [],
            userRepos: [],
            perPage: 5
        }
    }

    render() {
        return (
            <div>
                <Search onFormSubmit={this.handleFormSubmit.bind(this)}/>
                <Profile {...this.state}/>
            </div>
        )
    }

    //get user data from Github
    getUserData() {
        $.ajax({
            url: 'https://api.github.com/users/' + this.state.username + '?client_id=' + this.props.clientId + '&client_secret=' + this.props.clientSecret,
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({userData: data});
            }.bind(this),
            error: function (xhr, status, err) {
                this.setState({username: null});
            }.bind(this)
        });
    }

    //get user repos from Github
    getUserRepos() {
        $.ajax({
            url: 'https://api.github.com/users/' + this.state.username + '/repos?per_page=' + this.state.perPage + '?client_id=' + this.props.clientId + '&client_secret=' + this.props.clientSecret + '&sort=created',
            dataType: 'json',
            cache: false,
            success: function (data) {
                this.setState({userRepos: data});
            }.bind(this),
            error: function (xhr, status, err) {
                this.setState({username: null});
            }.bind(this)
        });
    }

    componentDidMount() {
        this.getUserData();
        this.getUserRepos();
    }
}

App.propTypes = {
    clientId: React.PropTypes.string,
    clientSecret: React.PropTypes.string
};

App.defaultProps = {
    clientId: '077b9a891b5c83f75813',
    clientSecret: 'c35d7b5f21b64198ff0cdfcf9f4eb25208993023'
};

export default App