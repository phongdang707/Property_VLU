import React from "react";
import { Layout } from "antd";
import SiderBar from "./sideBar";
import ListHeader from "./listHeader";
import ViewListProperty from "./property/viewListProperty";
import HeaderTop from "./header";
import FooterTop from "./footer";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PropertyItem from "./property/propertyItem";
import AddProperty from "./property/addProperty";
import Details from "./property/details";
import UpdateProperty from "./property/updateProperty";
import AddFullContract from "./addFullContract";
import AddInstallmentContract from "./addInstallmentContract";
import FullContract from "./fullContract";
import PrintFullContract from "./printFullContract";
import ViewListIntallmentContract from "./viewListIntallmentContract";

const { Content } = Layout;

class Index extends React.Component {
  state = {
    collapsed: false
  };

  onCollapse = collapsed => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    const { id } = this.props;
    return (
      <Router>
        <Layout style={{ minHeight: "100vh" }}>
          <SiderBar></SiderBar>
          <Layout>
            <HeaderTop></HeaderTop>

            <Content style={{ margin: "0 16px" }}>
              <ListHeader></ListHeader>
              <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
                <Switch>
                  <Route exact path="/admin">
                    <ViewListProperty></ViewListProperty>
                  </Route>
                  <Route path="/admin/addProperty">
                    <AddProperty></AddProperty>
                  </Route>
                  <Route
                    path="/admin/Details/:id"
                    children={<Details id={id} />}
                  ></Route>
                  <Route
                    path="/admin/UpdateProperty/:id"
                    children={<UpdateProperty id={id} />}
                  ></Route>
                  <Route
                    path="/admin/addFullContract/:id"
                    // children={<FullContract />}
                    render={props => (
                      <AddFullContract {...props.match.params} />
                    )}
                  >
                    {/* <FullContract></FullContract> */}
                  </Route>
                  <Route exact path="/admin/fullContract">
                    <FullContract></FullContract>
                  </Route>
                  <Route
                    path="/admin/addInstallmentContract/:id"
                    // children={<FullContract />}
                    render={props => (
                      <AddInstallmentContract {...props.match.params} />
                    )}
                  ></Route>
                  <Route exact path="/admin/intallmentContract">
                    <ViewListIntallmentContract></ViewListIntallmentContract>
                  </Route>
                </Switch>
              </div>
            </Content>
            <FooterTop></FooterTop>
          </Layout>
        </Layout>
        <Route path="/Print" component={() => <PrintFullContract />} />
      </Router>
    );
  }
}

export default Index;
