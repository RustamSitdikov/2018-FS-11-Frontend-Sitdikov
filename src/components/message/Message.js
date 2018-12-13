import React from 'react';
import classes from './Message.module.css';
import statuses from '../../utils/status/index';
import { imagePattern, getReadableSize } from '../../utils/file/index';
import getTime from '../../utils/time/index';

const Size = ({message}) => {
    const size = getReadableSize(message.attach.size);
    return (
        <span className={[classes.Text, classes.End].join(' ')}>{size}</span>
    );
};

const Time = ({message}) => {
    const time = getTime(message.date);
    return (
        <span className={classes.Text}>{time}</span>
    );
};

const Status = ({message}) => {
    let status;
    if (message.status === statuses.loading) {
        status = <span className={classes.Loading}/>;
    } else {
        status = <span className={classes.Loaded}/>;
    }
    return status;
};

const Image = ({file}) => {
    const src = URL.createObjectURL(file);
    return (
        <img className={classes.Image} src={src} alt={'file'} onLoad={() => URL.revokeObjectURL(src)}/>
    );
};

const Reference = ({file}) => {
    const href = URL.createObjectURL(file);
    const name = file.name;
    return (
        <a href={href}>{name}</a>
    );
};

const Text = ({message}) => {
    const text = message.text;
    return (
        <div>{text}</div>
    );
};

const Bar = ({message, isAttach, my}) => {
    return (
        <div className={classes.Bar}>
            {my ? (<Status message={message}/>) : null}
            <Time message={message}/>
            {isAttach ? (<Size message={message}/>) : null}
        </div>
    );
};

const Attach = ({message}) => {
    const file = message.attach;
    const isImage = file.type.match(imagePattern);
    return (
        <div>
            {isImage ? (
                <Image file={file}/>
            ) : (
                <Reference file={file}/>
            )}
        </div>
    );
};

class Message extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {message} = this.props;
        const isAttach = message.attach;
        const my = message.my;
        return (
            <div className={[classes.Message, my ? classes.My : ''].join(' ')}>
                {isAttach ? (
                    <Attach message={message}/>
                ) : (
                    <Text message={message}/>
                )}
                <Bar message={message} isAttach={isAttach} my={my}/>
            </div>
        );
    }
}

export default Message;
