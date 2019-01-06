import React from "react";
import { RouteComponentProps, withRouter } from "react-router";

const scrollToTop = (WrappedComponent: any): any => {
  type ScrollToTopProps = RouteComponentProps;

  class ScrollToTop extends React.PureComponent<ScrollToTopProps> {
    componentDidMount() {
      this.scrollToTop();
    }

    componentDidUpdate(prevProps: ScrollToTopProps) {
      if (this.props.location.pathname !== prevProps.location.pathname) {
        this.scrollToTop();
      }
    }

    scrollToTop = () => {
      window.scrollTo(0, 0);
    };

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  return withRouter(ScrollToTop);
};

export default scrollToTop;
