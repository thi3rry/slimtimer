import {h, Component} from "preact";

export default class Modal extends Component {
    state = {
        show: false,
        closable: true
    };

    static getDerivedStateFromProps(nextProps, prevState) {
        return {
            ...prevState,
            show: nextProps?.show ?? prevState.show,
            closable: nextProps?.closable ?? prevState.closable
        }
    }


    toggle() {
        if (this.state.show) {
            this.hide();
        }
        else {
            this.show();
        }
    }
    show() {
        this.setState((prevState, props) => {
            return {...prevState, show: true};
        });
        this.props?.onShow();
    }
    hide() {
        this.setState((prevState, props) => {
            return {...prevState, show: false};
        });
        this.props?.onHide();
    }

    render(props, state) {
        return (
            <div class={`modal bg-black bg-opacity-80 overflow-hidden ${state.show ? 'flex' : 'hidden'}`}
                 style="position: fixed;z-index:1;z-index:999999;top:0;left:0;right:0;bottom:0;align-items:center;justify-content:center;"
            >
                <div class="content relative p-10 bg-white m-auto "
                     style="width: 750px;max-width:90%;min-height: 300px;">
                    {state.closable && (
                        <button class="absolute  right-10" type={"button"} onClick={() => this.hide()}>x</button>
                    )}
                    {props.title && <h1 style="line-height:1;color:black;font-size: 54px;font-weight:bold;margin-top:32px;">{props.title}</h1>}
                    {props.text && <h1 style="line-height:1;color:black;font-size: 54px;font-weight:bold;margin-top:32px;">{props.text}</h1>}
                    {props.children}
                </div>
            </div>
        )
    }
}
