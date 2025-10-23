import React from "react";
import Link from "next/link";
const Sidebar = () => {
  return (
    <div className="col-xl-3 col-md-12 gx-topic">
      <div className="gx-card topic-sidebar">
        <div className="hx-card-header">
          <p className="hx-card-title">Topics</p>
        </div>
        <div className="gx-card-content gx-topic-list">
          <nav>
            <ul className="gx-sb-list">
              <li className="gx-sb-item">
                <Link href="javascript:void(0)" className="gx-drop-toggle">
                  <div className="data-list">
                    <i className="ri-dashboard-3-line"></i>
                    <span className="condense">Getting Started</span>
                  </div>
                  <i className="drop-arrow ri-arrow-down-s-line"></i>
                </Link>
                <ul className="dropdown-data">
                  <li>
                    <Link href="/#introduction" className="drop-down">
                      <i className="ri-record-circle-line"></i>
                      <p>Introduction</p>
                    </Link>
                  </li>
                  <li>
                    <Link href="/#core_features" className="drop-down">
                      <i className="ri-record-circle-line"></i>
                      <p>Core Features</p>
                    </Link>
                  </li>
                  <li>
                    <Link href="/#file_structure" className="drop-down">
                      <i className="ri-record-circle-line"></i>
                      <p>Start Up Guide</p>
                    </Link>
                  </li>

                  <li>
                    <Link href="/#Overview" className="drop-down">
                      <i className="ri-record-circle-line"></i>
                      <p>Overview</p>
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="gx-sb-item">
                <Link href="javascript:void(0)" className="gx-drop-toggle">
                  <div className="data-list">
                    <i className="ri-file-text-line"></i>
                    <span className="condense"> System Features</span>
                  </div>
                  <i className="drop-arrow ri-arrow-down-s-line"></i>
                </Link>
                <ul className="dropdown-data">
                  <li>
                    <Link href="/content#Dashboard" className="drop-down">
                      <i className="ri-record-circle-line"></i>
                      <p>Dashboard</p>
                    </Link>
                  </li>
                  <li>
                    <Link href="/content#calender" className="drop-down">
                      <i className="ri-record-circle-line"></i>
                      <p>Calendar</p>
                    </Link>
                  </li>
                  <li>
                    <Link href="/content#Appointements" className="drop-down">
                      <i className="ri-record-circle-line"></i>
                      <p>Appointments</p>
                    </Link>
                  </li>
                  <li>
                    <Link href="/content#IncomingCalls" className="drop-down">
                      <i className="ri-record-circle-line"></i>
                      <p>Incoming Calls</p>
                    </Link>
                  </li>
                  <li>
                    <Link href="/content#reviews" className="drop-down">
                      <i className="ri-record-circle-line"></i>
                      <p>Reviews</p>
                    </Link>
                  </li>
                  <li>
                    <Link href="/content#file_report" className="drop-down">
                      <i className="ri-record-circle-line"></i>
                      <p>Report</p>
                    </Link>
                  </li>
                  <li>
                    <Link href="/content#file_docManage" className="drop-down">
                      <i className="ri-record-circle-line"></i>
                      <p>Doctor Manegement</p>
                    </Link>
                  </li>
                  <li>
                    <Link href="/content#file_CliManage" className="drop-down">
                      <i className="ri-record-circle-line"></i>
                      <p>Clinic Management</p>
                    </Link>
                  </li>
                  <li>
                    <Link href="/content#file_Billing" className="drop-down">
                      <i className="ri-record-circle-line"></i>
                      <p>Billing</p>
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/content#file_TempManage"
                      className="drop-down d-flex align-items-center"
                    >
                      <i className="ri-record-circle-line"></i>
                      <p className="text-nowrap">Template Management</p>
                    </Link>
                  </li>
                  <li>
                    <Link href="/content#file_SystemManage" className="drop-down">
                      <i className="ri-record-circle-line"></i>
                      <p>System Settings</p>
                    </Link>
                  </li>
                  <li>
                    <Link href="/content#file_ProfileManage" className="drop-down">
                      <i className="ri-record-circle-line"></i>
                      <p>Profile Menu</p>
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="gx-sb-item-last">
                <Link href="/thanks" className="gx-page-link">
                  <div className="data-list">
                    <i className="ri-star-smile-line"></i>
                    <span className="condense">Thank You</span>
                  </div>
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
