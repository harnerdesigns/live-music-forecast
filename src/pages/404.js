import React, { Component } from "react";
import Helmet from "react-helmet";
import Layout from "../layout";
import styled from "styled-components";
import config from "../../data/SiteConfig";
import PageTitle from "../components/Pages/PageTitle/PageTitle";
import { Link } from "gatsby";

class Page404 extends Component {
  render() {
    return (
      <Layout>
        <div className="about-container">
          <Helmet title={`Page Not Found 😭 | ${config.siteTitle}`} />
          <FourWrapper>
            <PageTitle title={"😭"}>
              <PageTitle
                title={"Page Not Found"}
                subtitle={
                  "Either you broke something, or we broke something. Sorry..."
                }
              />
              <div className="buttons">
                <Link className="button alt" to="/">
                  &laquo; Go Home
                </Link>
                <Link className="button" to="/today">
                  See Today's Events &raquo;
                </Link>
              </div>
            </PageTitle>
          </FourWrapper>
        </div>
      </Layout>
    );
  }
}

export default Page404;

const FourWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  flex-direction: column;
  .page-title__wrapper {
    margin: 2rem auto;
  }
`;
