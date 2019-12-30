class App extends React.Component {
    constructor(props) {
        super(props);

        this.nextStage = this.nextStage.bind(this);

        this.state = {
            stage: 0,
            id: -1
        };
        this.stages = [
            <CheckOut setId={this.setId.bind(this)} getId={this.getId.bind(this)} nextStage={this.nextStage}/>, 
            <SignUpForm getId={this.getId.bind(this)} nextStage={this.nextStage}/>, 
            <AddressForm getId={this.getId.bind(this)} nextStage={this.nextStage}/>, 
            <PaymentForm getId={this.getId.bind(this)} nextStage={this.nextStage}/>,
            <Results getId={this.getId.bind(this)} nextStage={this.nextStage}/>
        ];
    }

    getId() {
        return this.state.id;
    }

    setId(id) {
        this.setState({
            id: id
        });
    }

    nextStage() {
        var newStage = 0;
        if (this.state.stage < (this.stages.length-1)){
            newStage = this.state.stage + 1;
        }

        this.setState({
            stage: newStage,
        });
    }

    render() {
        return <div>{this.stages[this.state.stage]}</div>;
    }
};

class CheckOut extends React.Component {

    constructor(props) {
        super(props);
    }

    startCheckout() {
        fetch('/checkout', {
            method: 'get',
        })
        .then(res => {
            return res.text();
        })
        .then(data => {
            this.props.setId(data);
            this.props.nextStage();
        });
    }

    render() {
        return <button onClick={() => this.startCheckout()}>Checkout</button>;
    };
}

class SignUpForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            checkoutId: '',
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        }
    }

    loadData() {
        fetch('/person', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
        .then(() => {
            this.props.nextStage();
        })
    }

    updateData(e) {
        switch(e.target.name) {
            case 'firstName':
                this.setState({
                    firstName: e.target.value
                });
                break;
            case 'lastName':
                this.setState({
                    lastName: e.target.value
                })
                break;
            case 'email':
                    this.setState({
                        email: e.target.value
                    })
                    break;
            case 'password':
                    this.setState({
                        password: e.target.value
                    })
                    break;
        }

        this.setState({
            checkoutId: this.props.getId()
        });
    }
    
    render() {
        return (<div>
            <div>Enter registration info</div>
            <br/>
            <table>
                <tbody>
                    <tr>
                        <td>First Name: </td><td><input name="firstName" onChange={(e) => this.updateData(e)} type="text"/></td>
                    </tr>
                    <tr>
                        <td>Last Name: </td><td><input name="lastName" onChange={(e) => this.updateData(e)} type="text"/></td>
                    </tr>
                    <tr>
                        <td>Email: </td><td><input name="email" onChange={(e) => this.updateData(e)} type="text"/></td>
                    </tr>
                    <tr>
                        <td>Password: </td><td><input name="password" onChange={(e) => this.updateData(e)} type="text"/></td>
                    </tr>
                </tbody>
            </table>
            <br/>
            <button onClick={() => this.loadData()}>Submit</button>
        </div>);
    }
};

class AddressForm extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            checkoutId: '',
            line1: '',
            line2: '',
            city: '',
            state: '',
            zip: ''
        }
    }

    loadData() {
        fetch('/address', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
        .then(() => {
            this.props.nextStage();
        })
    }

    updateData(e) {
        switch(e.target.name) {
            case 'line1':
                this.setState({
                    line1: e.target.value
                });
                break;
            case 'line2':
                this.setState({
                    line2: e.target.value
                })
                break;
            case 'city':
                    this.setState({
                        city: e.target.value
                    })
                    break;
            case 'state':
                    this.setState({
                        state: e.target.value
                    })
                    break;
            case 'zip':
                    this.setState({
                        zip: e.target.value
                    })
                    break;
        }

        this.setState({
            checkoutId: this.props.getId()
        });
    }
    
    render() {
        return (<div>
            <div>Enter address</div>
            <br/>
            <table>
                <tbody>
                    <tr>
                        <td>Line 1: </td><td><input name="line1" onChange={(e) => this.updateData(e)} type="text"/></td>
                    </tr>
                    <tr>
                        <td>Line 2: </td><td><input name="line2" onChange={(e) => this.updateData(e)} type="text"/></td>
                    </tr>
                    <tr>
                        <td>City: </td><td><input name="city" onChange={(e) => this.updateData(e)} type="text"/></td>
                    </tr>
                    <tr>
                        <td>State: </td><td><input name="state" onChange={(e) => this.updateData(e)} type="text"/></td>
                    </tr>
                    <tr>
                        <td>Zip: </td><td><input name="zip" onChange={(e) => this.updateData(e)} type="text"/></td>
                    </tr>
                </tbody>
            </table>
            <br/>
            <button onClick={() => this.loadData()}>Submit</button>
        </div>);
    }
};

class PaymentForm extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            checkoutId: '',
            creditCardNumber: '',
            expiration: '',
            cvv: '',
            zip: ''
        };
    }

    loadData() {
        fetch('/payment', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state)
        })
        .then(() => {
            this.props.nextStage();
        })
    }

    updateData(e) {
        switch(e.target.name) {
            case 'creditCardNumber':
                this.setState({
                    creditCardNumber: e.target.value
                });
                break;
            case 'expiration':
                    this.setState({
                        expiration: e.target.value
                    });
                    break;
            case 'cvv':
                this.setState({
                    cvv: e.target.value
                })
                break;
            case 'zip':
                    this.setState({
                        zip: e.target.value
                    })
                    break;
        }

        this.setState({
            checkoutId: this.props.getId()
        });
    }
    
    render() {
        return (<div>
            <div>Enter payment info</div>
            <br/>
            <table>
                <tbody>
                    <tr>
                        <td>Credit Card Number: </td><td><input name="creditCardNumber" onChange={(e) => this.updateData(e)} type="text"/></td>
                    </tr>
                    <tr>
                        <td>Expiration: </td><td><input name="expiration" onChange={(e) => this.updateData(e)} type="text"/></td>
                    </tr>
                    <tr>
                        <td>CVV: </td><td><input name="cvv" onChange={(e) => this.updateData(e)} type="text"/></td>
                    </tr>
                    <tr>
                        <td>Billing Zip Code: </td><td><input name="zip" onChange={(e) => this.updateData(e)} type="text"/></td>
                    </tr>
                </tbody>
            </table>
            <br/>
            <button onClick={() => this.loadData()}>Submit</button>
        </div>);
    }
}

class Results extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            results: '',
            id: ''
        }
    }

    componentDidMount(){

        fetch('/results', {
            headers: {
                id: this.props.getId()
            }
        })
        .then(data => {
            return data.text();
        })
        .then(data => {
            this.setState({
                results: data
            });
        });
    }

    render() {
        return (<div>
            <div>{this.state.results}</div>
            <button onClick={() => this.props.nextStage()}>Submit</button>
        </div>);
    }
}


ReactDOM.render(<Form />, document.getElementById('app'));

