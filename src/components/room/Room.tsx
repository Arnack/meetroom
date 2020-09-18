import React, {Component} from "react";

interface IProps {
    id: string;
    match: any;
}
interface IState {
}

export class Room extends Component<IProps, IState> {

    //for removing users
    handleWindowBeforeUnload = () => {
        // e - целевое событие
    };

    componentDidMount() {
        //for removing users
        window.addEventListener('beforeunload', this.handleWindowBeforeUnload);
        //TODO add user to this room
    }

    componentWillUnmount() {
        window.removeEventListener('beforeunload', this.handleWindowBeforeUnload);
        //TODO remove user
    }

    render() {
        const { id } = this.props.match.params;
        console.log('props', this.props)
        return <>
            {id}
        </>;
    }
}
