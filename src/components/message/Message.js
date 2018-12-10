import React from 'react';
import classes from './Message.module.css'
import statuses from '../../utils/status/index'
import { imagePattern, getReadableSize } from '../../utils/file/index';

const Size = ({file}) => {
    const size = getReadableSize(file.size);
    return (
        <span className={classes.End}>{size}</span>
    );
};

const Time = ({message}) => {
    const time =  [
        message.time.getHours(),
        message.time.getMinutes(),
    ].map(num => (num < 10 ? `0${num}` : num)).join(':');
    return (
        <span className={classes.Time}>{time}</span>
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
        <img src={src} alt={'file'} onLoad={() => URL.revokeObjectURL(src)}/>
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

const Content = ({message}) => {
    const isAttach = message.attach;
    const my = message.my;
    return (
        <div className={[classes.Content, my ? classes.My : ''].join(' ')}>
            {isAttach ? (
                <Attach message={message}/>
            ) : (
                <Text message={message}/>
            )}
            <Bar message={message} isAttach={isAttach} my={my}/>
        </div>
    );
};

class Message extends React.Component {
    render() {
        const message = this.props.message;
        return (
            <Content message={message}/>
        );
    }
}

export default Message;
