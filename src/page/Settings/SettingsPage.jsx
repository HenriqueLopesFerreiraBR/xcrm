import React from 'react';
import ChatBox from "../../components/ChatBox/ChatBox";
import Footer from "../../components/Footer/footer";
import Header from "../../components/Header/Header";
import Navheader from "../../components/Navheader/Navheader";
import PreLoader from "../../components/PreLoader/PreLoader";
import ScrollableModal from "../../components/ScrollableModal/ScrollableModal";
import Sidebar from "../../components/Sidebar/Sidebar";
import SettingViewComponent from '../../components/SettingComponents/SettingViewComponent';

// import { Container } from './styles';

function SettingPage() {
  return (
    <div className="SettingPage">
            {/* Preloader start */}
            <PreLoader />
            {/* Preloader end */}

            {/* Main wrapper start*/}
            <div id="main-wrapper">
                {/* Nav header start*/}
                <Navheader />
                {/* Nav header end */}

                {/* Chat box start*/}
                <ChatBox />
                {/* Chat box End*/}

                {/* Header start */}
                <Header />
                {/* Header end */}

                {/* Sidebar start */}
                <Sidebar />
                {/* Sidebar end */}

                {/* Content body start */}

                <div className="content-body">
                    <SettingViewComponent />
                </div>

                {/* Content body end */}

                {/* Scrollable modal  */}
                <ScrollableModal />

                {/* Footer start */}

                <Footer />

                {/* Footer end */}
            </div>
        </div>
  );
}

export default SettingPage;