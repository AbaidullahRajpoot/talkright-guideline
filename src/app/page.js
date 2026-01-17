"use client";
import Link from "next/link";
import Sidebar from "./components/sidebar";
export default function Home() {
  return (
    <>
      <div className="page-title">
        <p className="main-title-right">Getting Started</p>
        <ul className="right-top-ul">
          <li className="right-top-li">
            <Link href="/">TalkRight</Link>
          </li>
          <li className="right-top-li">Getting Started</li>
        </ul>
      </div>
      <div className="row sections">
        <Sidebar />
        <div className="col-xl-9 col-md-12">
          <div className="gx-block" id="introduction">
            <div className="gx-card gx-page-block">
              <div className="gx-card-header">
                <p className="second-main-title">Introduction</p>
                <div className="header-tools">
                  <a href="#" className="gx-full-card">
                    <i className="ri-fullscreen-fill"></i>
                  </a>
                </div>
              </div>
              <div className="gx-card-content">
                <div className="intero talkright-intro ">
                  <p className="popins-data-helpex">
                    Welcome to the User Guide of TalkRight WebApp! This will
                    help you understand how to get started and customize your
                    experience in the TalkRight.
                  </p>
                  <h1 className="main-heading">What is TalkRight?</h1>
                  <p className="popins-data-helpex">
                    <strong>TalkRight</strong> is an AI-powered web application
                    designed to make hospital appointments simple and
                    stress-free. With TalkRight, patients can easily book their
                    appointments through{" "}
                    <strong>
                      AI-assisted calling or directly via WhatsApp,
                    </strong>{" "}
                    while hospital staff can also manage manual bookings
                    according to available doctors. This app is built to
                    simplify hospital administration by managing appointments
                    more efficiently, providing convenience to both patients and
                    hospital staff.
                  </p>
                  <p className="popins-data-helpex">
                    Patients can call or request an appointment through
                    WhatsApp, and the AI will verify the doctor’s availability
                    for the requested slot using the configured clinic WhatsApp
                    number. In case of unavailability, it will automatically
                    suggest the nearest available timing. Similarly, hospital
                    staff can manually check doctor schedules, departments, and
                    shift timings when booking on-site.
                  </p>

                  <p className="popins-data-helpex">
                    <strong>TalkRight</strong> is a smart healthcare assistant
                    that bridges the gap between patients and hospitals,
                    eliminating the need for long queues or confusing booking
                    processes. Hospitals can easily edit and customize
                    communication templates according to their needs, ensuring
                    flexibility for different healthcare setups. These templates
                    come in three types: <strong>Email</strong>,
                    <strong> WhatsApp</strong>, and <strong>Poll</strong>.
                  </p>

                  <ul>
                    <li className="popins-data-helpex">
                      <strong>Email</strong> and{" "}
                      <strong>WhatsApp templates</strong> are used for all types
                      of booking confirmations, including new appointments,
                      rescheduling, and cancellations.
                    </li>
                    <li className="popins-data-helpex">
                      <strong>Poll templates</strong> are designed to collect
                      patient feedback and ratings, helping hospitals measure
                      satisfaction and improve service quality.
                    </li>
                    <li className="popins-data-helpex">
                      The same templates are also used for automated reminder
                      messages, powered by cron jobs, which notify patients
                      about their upcoming appointments.
                    </li>
                    <li className="popins-data-helpex">
                      <strong>Through WhatsApp configuration,</strong> clinics
                      enable patients to book, confirm, reschedule, or cancel
                      appointments directly via WhatsApp. The AI fully manages
                      these interactions using the configured clinic WhatsApp
                      number, ensuring seamless, automated appointment handling.
                    </li>
                  </ul>
                  <p className="popins-data-helpex">
                    TalkRight also supports customized outbound email
                    management. Through the <strong>Email Configuration</strong>{" "}
                    module, clinics can integrate their own email account into
                    the system. Once configured, all appointment-related
                    communications such as confirmations, reminders,
                    cancellations, and other system-generated notifications will
                    be sent directly from the clinic’s preferred email address.
                    This will allow clinics to maintain full control over their
                    communication identity.
                  </p>

                  <p className="popins-data-helpex">
                    In addition to appointment management, TalkRight offers a
                    complete set of tools for{" "}
                    <strong>hospital and clinic administration</strong>,
                    including:
                  </p>

                  <ul>
                    <li className="popins-data-helpex">
                      <strong>View and filter appointment details </strong>
                      for quick access to patient and doctor schedules.
                    </li>
                    <li className="popins-data-helpex">
                      <strong>Access all reports</strong> and{" "}
                      <strong>call summaries</strong> in one place.
                    </li>
                    <li className="popins-data-helpex">
                      <strong>Call patients directly</strong> from the system
                      for instant communication.
                    </li>
                    <li className="popins-data-helpex">
                      <strong>Clinic management</strong>, including setting
                      regular hours, holidays, and sudden off days.
                    </li>
                    <li className="popins-data-helpex">
                      <strong>Doctor management</strong>, allowing admins to add
                      or remove departments, assign or remove doctors, manage
                      their shift timings, and update their leave schedules as
                      needed.
                    </li>
                  </ul>
                  <p className="popins-data-helpex">
                    Overall, <strong>TalkRight</strong> is designed to simplify
                    healthcare management for both patients and hospital
                    administrators, ensuring a{" "}
                    <strong>smooth, reliable,</strong> and{" "}
                    <strong>intelligent appointment experience</strong>.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="gx-block" id="core_features">
            <div className="gx-card gx-page-block">
              <div className="gx-card-header">
                <p className="second-main-title">TalkRight Features</p>
                <div className="header-tools">
                  <a href="#" className="gx-full-card">
                    <i className="ri-fullscreen-fill"></i>
                  </a>
                </div>
              </div>
              <div className="gx-card-content">
                <div className="intero">
                  <div className="row core-boxes">
                    <div className="col-lg-3 col-md-4 col-sm-6">
                      <div className="feature-box">
                        <div className="feature-image">
                          <span
                            className="material-symbols-outlined "
                            style={{ fontSize: "30px", color: "#009d71" }}
                          >
                            book
                          </span>
                        </div>
                        <p className="feature-name">
                          <strong>Appointments</strong>
                        </p>
                        <p className="feature-text">
                          View Appointment Details & Manage Status
                        </p>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-6">
                      <div className="feature-box">
                        <div className="feature-image">
                          <span
                            className="material-symbols-outlined "
                            style={{ fontSize: "30px", color: "#009d71" }}
                          >
                            group
                          </span>
                        </div>
                        <p className="feature-name text-center">
                          <strong>Patient History</strong>{" "}
                        </p>
                        <p className="feature-text">View Patient History</p>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-6">
                      <div className="feature-box">
                        <div className="feature-image">
                          <span
                            className="material-symbols-outlined "
                            style={{ fontSize: "30px", color: "#009d71" }}
                          >
                            group
                          </span>
                        </div>
                        <p className="feature-name text-center">
                          <strong>Management</strong>{" "}
                        </p>
                        <p className="feature-text">
                          Manage Your Departments & Doctors
                        </p>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-6">
                      <div className="feature-box">
                        <div className="feature-image">
                          <span
                            className="material-symbols-outlined"
                            style={{ fontSize: "30px", color: "#009d71" }}
                          >
                            phone_callback
                          </span>
                        </div>
                        <p className="feature-name">
                          <strong>AI Calling </strong>
                        </p>
                        <p className="feature-text">Make AI-Powered Calls </p>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-6">
                      <div className="feature-box">
                        <div className="feature-image">
                          <span
                            className="material-symbols-outlined "
                            style={{ fontSize: "30px", color: "#009d71" }}
                          >
                            room_preferences
                          </span>
                        </div>
                        <p className="feature-name text-center">
                          <strong>Clinic Management</strong>
                        </p>
                        <p className="feature-text">
                          {" "}
                          Manage Clinic Availability & Days Off{" "}
                        </p>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-6">
                      <div className="feature-box">
                        <div className="feature-image">
                          <span
                            className="material-symbols-outlined  "
                            style={{ fontSize: "30px", color: "#009d71" }}
                          >
                            speed
                          </span>
                        </div>
                        <p className="feature-name">
                          <strong>Dashboard</strong>{" "}
                        </p>
                        <p className="feature-text">Workspace Overview</p>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-6">
                      <div className="feature-box">
                        <div className="feature-image">
                          <span
                            className="material-symbols-outlined "
                            style={{ fontSize: "30px", color: "#009d71" }}
                          >
                            credit_card
                          </span>
                        </div>
                        <p className="feature-name">
                          <strong>Billing System</strong>
                        </p>
                        <p className="feature-text">Billing & Plans</p>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-6">
                      <div className="feature-box">
                        <div className="feature-image">
                          <span
                            className="material-symbols-outlined "
                            style={{ color: "#009d71", fontSize: "30px" }}
                          >
                            calendar_month
                          </span>
                        </div>
                        <p className="feature-name">
                          <strong>Calendar</strong>
                        </p>
                        <p className="feature-text">Easy Booking</p>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-6">
                      <div className="feature-box">
                        <div className="feature-image">
                          <span
                            className="material-symbols-outlined "
                            style={{ fontSize: "30px", color: "#009d71" }}
                          >
                            view_quilt
                          </span>
                        </div>
                        <p className="feature-name text-center">
                          <strong>Template Management</strong>
                        </p>
                        <p className="feature-text">
                          Manage Email & WhatsApp Templates
                        </p>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-6  ">
                      <div className="feature-box text-center ">
                        <div className="feature-image">
                          <span
                            className="material-symbols-outlined"
                            style={{ fontSize: "30px", color: "#009d71" }}
                          >
                            settings
                          </span>
                        </div>
                        <p className="feature-name">
                          <strong>System Settings</strong>
                        </p>
                        <p className="feature-text">
                          Control System Notifications, Communication, &
                          Branding.
                        </p>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-6 ">
                      <div className="feature-box text-center   ">
                        <div className="feature-image">
                          <span
                            className="material-symbols-outlined"
                            style={{ fontSize: "30px", color: "#009d71" }}
                          >
                            forum
                          </span>
                        </div>
                        <p className="feature-name">
                          <strong>Reviews</strong>
                        </p>
                        <p className="feature-text">Ratings & Reviews</p>
                      </div>
                    </div>
                    <div className="col-lg-3 col-md-4 col-sm-6 ">
                      <div className="feature-box text-center ">
                        <div className="feature-image">
                          <span
                            className="material-symbols-outlined"
                            style={{ fontSize: "30px", color: "#009d71" }}
                          >
                            report
                          </span>
                        </div>
                        <p className="feature-name">
                          <strong>Report</strong>
                        </p>
                        <p className="feature-text">Report Centre</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="gx-block" id="file_structure">
            <div className="gx-card gx-page-block">
              <div className="gx-card-header">
                <p className="second-main-title">Start Up Guide</p>
                <div className="header-tools">
                  <a href="#" className="gx-full-card">
                    <i className="ri-fullscreen-fill"></i>
                  </a>
                </div>
              </div>
              <div className="gx-card-content">
                <div className="file-structure">
                  <ul className="gx-main-structure">
                    <li>
                      <a
                        href="#"
                        className="gx-struct-drop d-flex align-items-end"
                      >
                        <i className="ri-arrow-down-s-line gx-arrow"></i>
                        <i className="ri-folder-open-line"></i>
                        Quick Start Guide
                      </a>

                      <ul className="gx-sub show">
                        <li>
                          <a
                            href="#"
                            className="gx-struct-drop-under d-flex align-items-end"
                          >
                            <i className="ri-arrow-down-s-line gx-arrow"></i>
                            <i className="ri-file-text-line"></i>
                            Step 1: Register or Log In
                          </a>
                          <ul className="gx-sub-under">
                            <li>
                              <i className="ri-information-line"></i>
                              Create a new account or log in using your existing
                              credentials to access the TalkRight dashboard.
                            </li>
                          </ul>
                        </li>

                        <li>
                          <a
                            href="#"
                            className="gx-struct-drop-under d-flex align-items-end"
                          >
                            <i className="ri-arrow-down-s-line gx-arrow"></i>
                            <i className="ri-file-text-line"></i>
                            Step 2: Set Up Clinic Settings
                          </a>
                          <ul className="gx-sub-under">
                            <li>
                              <i className="ri-information-line"></i>Navigate to
                              <strong> Clinic Management</strong> and configure
                              your clinic’s basic settings.
                            </li>
                            <li>
                              <i className="ri-information-line"></i>Define
                              clinic working hours, regular schedules under
                              Clinic Timings, holidays under Permanent Day Off,
                              or any sudden off days under Random Day Off. This
                              step is essential, as all appointments and doctor
                              availability depend on clinic timing.
                            </li>
                          </ul>
                        </li>

                        <li>
                          <a
                            href="#"
                            className="gx-struct-drop-under d-flex align-items-end"
                          >
                            <i className="ri-arrow-down-s-line gx-arrow"></i>
                            <i className="ri-file-text-line"></i>
                            Step 3: Configure Departments & Add Doctors
                          </a>
                          <ul className="gx-sub-under">
                            <li>
                              <i className="ri-information-line"></i>Go to
                              <strong>
                                {" "}
                                Doctor Management → Departments
                              </strong>{" "}
                              and add the medical departments available in your
                              clinic or hospital.
                            </li>
                            <li>
                              <i className="ri-information-line"></i>
                              Under <strong>Doctor Management → Doctors</strong>
                              , add doctors and assign them to the relevant
                              departments.
                            </li>
                            <li>
                              <i className="ri-information-line"></i>
                              Set their shift timings, availability, and leave
                              schedules to ensure accurate appointment bookings.
                            </li>
                          </ul>
                        </li>

                        <li>
                          <a
                            href="#"
                            className="gx-struct-drop-under d-flex align-items-end"
                          >
                            <i className="ri-arrow-down-s-line gx-arrow"></i>
                            <i className="ri-file-text-line"></i>
                            Step 4: Purchase Subscription
                          </a>
                          <ul className="gx-sub-under">
                            <li>
                              <i className="ri-information-line"></i>Visit the
                              Billing section and purchase a subscription to
                              activate <strong>AI Calling</strong> and{" "}
                              <strong>WhatsApp Automated Chat</strong>.
                            </li>
                            <li>
                              <i className="ri-information-line"></i> This step
                              is mandatory to enable AI-powered appointment
                              handling and confirmations.
                            </li>
                          </ul>
                        </li>

                        <li>
                          <a
                            href="#"
                            className="gx-struct-drop-under d-flex align-items-end"
                          >
                            <i className="ri-arrow-down-s-line gx-arrow"></i>
                            <i className="ri-file-text-line"></i>
                            Step 5: Configure WhatsApp
                          </a>
                          <ul className="gx-sub-under">
                            <li>
                              <i className="ri-information-line"></i>Open
                              <strong>
                                {" "}
                                System Settings → WhatsApp Configuration
                              </strong>{" "}
                              and connect your clinic’s WhatsApp number.
                            </li>
                            <li>
                              <i className="ri-information-line"></i> This
                              configuration is mandatory for AI chat, AI booking
                              confirmations, and automated WhatsApp
                              interactions.
                            </li>

                            <li>
                              <i className="ri-information-line"></i> Without
                              WhatsApp configuration, even AI call bookings will
                              not be confirmed.
                            </li>
                          </ul>
                        </li>

                        <li>
                          <a
                            href="#"
                            className="gx-struct-drop-under d-flex align-items-end"
                          >
                            <i className="ri-arrow-down-s-line gx-arrow"></i>
                            <i className="ri-file-text-line"></i>
                            Step 6: Configure Email
                          </a>
                          <ul className="gx-sub-under">
                            <li>
                              <i className="ri-information-line"></i>Navigate to
                              <strong>
                                {" "}
                                System Settings → Email Configuration
                              </strong>{" "}
                              and set up your preferred email account.
                            </li>
                            <li>
                              <i className="ri-information-line"></i> All
                              appointment confirmations, notifications, and
                              reminder emails will be sent from this configured
                              email address.
                            </li>
                          </ul>
                        </li>

                        <li>
                          <a
                            href="#"
                            className="gx-struct-drop-under d-flex align-items-end"
                          >
                            <i className="ri-arrow-down-s-line gx-arrow"></i>
                            <i className="ri-file-text-line"></i>
                            Step 7: Set Communication Templates
                          </a>
                          <ul className="gx-sub-under">
                            <li>
                              <i className="ri-information-line"></i>Go to
                              <strong> Template Management</strong> and
                              configure Email, WhatsApp, and Poll templates.
                            </li>
                            <li>
                              <i className="ri-information-line"></i> These
                              templates are used for booking confirmations,
                              reschedules, cancellations, reminders, and patient
                              feedback collection.
                            </li>
                          </ul>
                        </li>

                        <li>
                          <a
                            href="#"
                            className="gx-struct-drop-under d-flex align-items-end"
                          >
                            <i className="ri-arrow-down-s-line gx-arrow"></i>
                            <i className="ri-file-text-line"></i>
                            Step 8: Book Appointments Manually
                          </a>
                          <ul className="gx-sub-under">
                            <li>
                              <i className="ri-information-line"></i>Use the
                              <strong> Calendar</strong> to create and manage
                              manual appointments based on doctor and clinic
                              availability.
                            </li>
                          </ul>
                        </li>

                        <p className="mt-2">
                          <strong>You’re All Set</strong>
                        </p>
                        <p className="font-new">
                          Once these steps are completed, your system is fully
                          configured.
                        </p>
                        <p className="font-new mb-2">
                          You can now manage appointments, automate patient
                          communication, and use all TalkRight features smoothly
                          and efficiently.
                        </p>
                      </ul>
                    </li>
                  </ul>
                </div>

                {/* -------------------- */}

                <div className="file-structure">
                  <ul className="gx-main-structure">
                    <li>
                      <a
                        href="#"
                        className="gx-struct-drop d-flex align-items-end"
                      >
                        <i className="ri-arrow-down-s-line gx-arrow"></i>
                        <i
                          className="material-symbols-outlined"
                          style={{ fontSize: "25px", marginLeft: "3px" }}
                        >
                          how_to_reg
                        </i>
                        How To Register
                      </a>

                      <ul className="gx-sub show">
                        <li>
                          <a
                            href="#"
                            className="gx-struct-drop-under d-flex align-items-end"
                          >
                            <i className="ri-arrow-down-s-line gx-arrow"></i>
                            <i
                              className="material-symbols-outlined"
                              style={{ fontSize: "23px", marginRight: "9px" }}
                            >
                              {" "}
                              account_box
                            </i>
                            Step 1: Provide Your Account Details
                          </a>
                          <ul className="gx-sub-under">
                            <li>
                              <i className="ri-information-line"></i>Uploading a
                              profile photo is optional. If you choose to add
                              one, click Upload New Photo. Supported formats
                              include JPG, GIF, and PNG, with a maximum file
                              size of 800 KB. If you don't want to upload image
                              but its uploaded by mistake, use the Reset button
                              to remove it and revert to your previous or
                              default photo.
                            </li>
                            <li>
                              <i className="ri-information-line"></i>Enter your
                              email address in the provided field. This will be
                              used for login and account verification.
                            </li>
                            <li>
                              <i className="ri-information-line"></i>Create a
                              secure password containing at least eight
                              characters, including one letter, one number, and
                              one special character. Re-enter the same password
                              in the <strong>Confirm Password</strong> field to
                              ensure accuracy. For security, both fields encrypt
                              the entered characters.
                            </li>
                            <li>
                              <i className="ri-information-line"></i>Once all
                              details are filled, use the Next button to move
                              forward.
                            </li>
                          </ul>
                        </li>

                        <li>
                          <a
                            href="#"
                            className="gx-struct-drop-under d-flex align-items-end"
                          >
                            <i className="ri-arrow-down-s-line gx-arrow"></i>
                            <i
                              className="material-symbols-outlined"
                              style={{ fontSize: "23px", marginRight: "9px" }}
                            >
                              article_person{" "}
                            </i>
                            Step 2: Provide Your Personal Information
                          </a>
                          <ul className="gx-sub-under">
                            <li>
                              <i className="ri-information-line"></i>Enter your
                              first name and last name in the respective fields.
                            </li>
                            <li>
                              <i className="ri-information-line"></i>Select your
                              country from the dropdown.
                            </li>
                            <li>
                              <i className="ri-information-line"></i>Choose your
                              gender from the list of options.
                            </li>
                            <li>
                              <i className="ri-information-line"></i>Enter your
                              birth date in the provided format (MM/DD/YYYY) or
                              select from calendar.
                            </li>
                            <li>
                              <i className="ri-information-line"></i>Add your
                              phone number with the correct country code by
                              selecting the flag and entering your number.
                            </li>
                            <li>
                              <i className="ri-information-line"></i>Click Next
                              to proceed to the following step, or use Back if
                              you need to return to the previous section.
                            </li>
                          </ul>
                        </li>

                        <li>
                          <a
                            href="#"
                            className="gx-struct-drop-under d-flex align-items-end"
                          >
                            <i className="ri-arrow-down-s-line gx-arrow"></i>
                            <i
                              className="material-symbols-outlined"
                              style={{ fontSize: "23px", marginRight: "9px" }}
                            >
                              business_center
                            </i>
                            Step 3: Provide Your Business Details
                          </a>
                          <ul className="gx-sub-under">
                            <li>
                              <i className="ri-information-line"></i>Enter the
                              Centre Name and the Physical Address of the
                              business.
                            </li>

                            <li>
                              <i className="ri-information-line"></i>Provide the
                              Business Trade Name and Business Address (if the
                              business address is the same as the physical
                              address, you can check the “Copy from Physical
                              Address” checkbox to auto-fill it).
                            </li>

                            <li>
                              <i className="ri-information-line"></i>Select the
                              Business Country (if it matches the personal info
                              country, you can simply check “Copy from Personal
                              Info Country).
                            </li>

                            <li>
                              <i className="ri-information-line"></i>Fill in the
                              City where the business operates.
                            </li>

                            <li>
                              <i className="ri-information-line"></i>Add the
                              Primary Contact Email (if it is the same as the
                              account email, check “Copy from Account Details
                              Email” to auto-fill).
                            </li>

                            <li>
                              <i className="ri-information-line"></i>Enter the
                              Primary Contact Phone Number with the correct
                              country code, or check “Copy from Personal Info
                              Phone Number” if it's the same as your personal
                              number.
                            </li>

                            <li>
                              <i className="ri-information-line"></i>Select your
                              Timezone from the dropdown. This is one-time,
                              irreversible selection that sets the fixed
                              timezone for the entire platform (all
                              appointments, reports, reminders, and automated
                              processes) will follow this timezone. It will be
                              automatically suggested based on your selected
                              business country. If you prefer a different
                              timezone, you may change it, but choose carefully
                              as it cannot be modified later.
                            </li>

                            <li>
                              <i className="ri-information-line"></i>Check the
                              box to agree to the privacy policy and terms.
                            </li>

                            <li>
                              <i className="ri-information-line"></i>Click "Sign
                              Up" to complete the registration.
                            </li>

                            <li>
                              <i className="ri-information-line"></i>If you
                              already have an account, click "Sign in instead."
                            </li>
                          </ul>
                        </li>

                        {/* <li>
                          <a
                            href="javascript:void(0)"
                            className="gx-struct-drop-under d-flex align-items-end"
                          >
                            <i className="ri-arrow-up-s-line"></i>
                            <i
                              className="material-symbols-outlined"
                              style={{ fontSize: "23px", marginRight: "9px" }}
                            >
                              upload_file
                            </i>
                            Step 4: Upload the Required Documents
                          </a>
                          <ul className="gx-sub-under">
                            <li>
                              <i className="ri-information-line"></i>Upload a
                              valid Trade License in .jpeg, .jpg, .png, or .gif
                              format (max size 2 MB).
                            </li>
                            <li>
                              <i className="ri-information-line"></i>Upload the
                              ID of the Responsible Person in .jpeg, .jpg, .png,
                              or .gif format (max size 2 MB)
                            </li>
                            <li>
                              <i className="ri-information-line"></i>Upload the
                              Signed Contract in .jpeg, .jpg, .png, or .gif
                              format (max size 2 MB).
                            </li>
                            <li>
                              <i className="ri-information-line"></i>Check the
                              box to agree to the privacy policy and terms.
                            </li>
                            <li>
                              <i className="ri-information-line"></i>Click "Sign
                              Up" to complete the registration.
                            </li>
                            <li>
                              <i className="ri-information-line"></i>If you
                              already have an account, click "Sign in instead."
                            </li>
                          </ul>
                        </li> */}
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="gx-block" id="Overview">
            <div className="gx-card gx-page-block">
              <div className="gx-card-header">
                <p className="second-main-title">Overview</p>
                <div className="header-tools">
                  <a href="#" className="gx-full-card">
                    <i className="ri-fullscreen-fill"></i>
                  </a>
                </div>
              </div>
              <div className="gx-card-content">
                <div className="file-customization">
                  <ul>
                    <li>
                      <strong>Dashboard: </strong>
                      The TalkRight dashboard gives hospital administrators a
                      clear and organized overview of daily operations. It
                      displays key insights such as total calls, today’s calls,
                      average call duration, and total appointments. Users can
                      also view survey ratings, call statistics, appointment
                      records, and performance summaries, helping them monitor
                      progress and maintain efficiency.
                    </li>
                    <li>
                      <strong>Calendar: </strong>
                      The Calendar allows hospital staff to manually create
                      appointments as needed, providing complete flexibility in
                      scheduling. Staff can view all reserved appointments or
                      view filtered appointments of a specific doctor. Booking
                      details can be edited at any time, and appointments can be
                      moved from one date to another within the same time slot.
                      The system does not restrict appointment reservation
                      through calendar, based on doctor or hospital timings,
                      allowing appointments to be created or adjusted easily
                      during emergency situations without any scheduling
                      limitations.
                    </li>
                    <li>
                      <strong>Appointments: </strong>
                      This section provides a structured and organized view of
                      all patient appointments through separate tabs for{" "}
                      <strong>All, Confirmed, Completed,</strong> and{" "}
                      <strong>Cancelled </strong>
                      appointments. Hospital staff can easily monitor and manage
                      appointments based on their status, ensuring smooth
                      operations and reduced errors. Appointments can also be
                      filtered and sorted by date, time, doctor’s name,
                      patient’s name, email, or department for quick access and
                      efficient organization.
                    </li>
                    <li>
                      <strong>Patient: </strong>
                      The Patients section shows a unified list of patients
                      grouped by phone number with their appointment history.
                      Clicking a patient’s number opens all related bookings,
                      and the <strong>Patient Consent</strong> view indicates
                      whether the patient has agreed to data storage and usage.
                    </li>

                    <li>
                      <strong>Incoming Calls: </strong>
                      This section maintains a detailed log of all incoming
                      calls. It records caller information, including name,
                      email, and contact number, along with complete call
                      details such as date, time, and call duration. When an
                      appointment is created during a call, the reserved
                      doctor’s name is also recorded instead of the centre
                      number. This ensures call history remains complete,
                      transparent, and easily accessible for review and
                      follow-up.
                    </li>
                    <li>
                      <strong>Reviews: </strong>
                      The Reviews section compiles feedback from both surveys
                      and call interactions. It helps hospital management
                      evaluate patient satisfaction levels and identify areas
                      for improvement in service quality and communication.
                    </li>
                    <li>
                      <strong>Reports: </strong>
                      The Reports section provides a structured view of all
                      appointment-related reports in a single interface. It
                      allows staff to review detailed appointment records,
                      including patient information, doctor, department, date
                      and time, and appointment status. Reports can be filtered
                      by date range, department, and doctor, and can be searched
                      or exported for further analysis. This ensures organized
                      record-keeping, quick review, and effective tracking of
                      operational activity.
                    </li>
                    <li>
                      <strong>Doctor Management: </strong>
                      Doctor Management provides complete details about doctors,
                      their departments, and shift schedules. It allows staff to
                      add doctors to specific departments and manage their
                      availability, including shift timings and leave records,
                      for better coordination and planning.
                    </li>
                    <li>
                      <strong>Clinic Management: </strong>
                      This section manages the clinic’s operational schedule,
                      including centre availability, fixed weekly off-days and
                      occasional leaves. It helps staff stay informed about
                      clinic availability and ensures accurate appointment
                      scheduling.
                    </li>
                    <li>
                      <strong>Billing: </strong>
                      The Billing section displays information about
                      subscription packages and purchase history including the
                      active package, its duration, and total subscriptions to
                      date. Administrators can easily subscribe to new packages,
                      or cancel & upgrade existing ones. For first-time
                      subscriptions, the system requires selecting an available
                      Twilio number in the respective region. Subsequent
                      renewals only require choosing the desired package.
                    </li>
                    <li>
                      <strong>Template Management: </strong>
                      Template Management enables hospital staff to manage and
                      edit Email, WhatsApp, and Poll templates for patient
                      communication. Predefined WhatsApp and Poll templates are
                      provided for convenience and can be customized to match
                      hospital requirements, ensuring professional and
                      personalized messaging for confirmations, reminders, and
                      feedback.
                    </li>
                    <li>
                      <strong>System Settings: </strong>
                      This section provides access to all essential system
                      configurations. You can manage notification intervals
                      (deciding which notifications are sent and when), set up
                      WhatsApp configuration for automated appointment messages
                      and reminders through cron jobs (automating reminders,
                      notifications, etc.), configure email settings to send
                      system emails directly from your own address, and
                      customize the system logo to provide a smooth user
                      experience.
                    </li>
                    <li>
                      <strong>Profile Menu: </strong>
                      The Profile Menu provides quick access to all
                      account-related settings and personal information. It
                      allows users to view their profile, update personal and
                      business details, change their password, and securely log
                      out. This centralized menu ensures easy management of user
                      data and account preferences.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
