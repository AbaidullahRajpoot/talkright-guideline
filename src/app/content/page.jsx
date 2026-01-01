"use client";

import React, { useEffect } from "react";
import Sidebar from "../components/sidebar";

const page = () => {
  // React useEffect version (or drop inside DOMContentLoaded for vanilla)
  useEffect(() => {
    // Find every stack on the page
    const stacks = Array.from(document.querySelectorAll(".stack"));

    stacks.forEach((stack) => {
      // Try to find the related list for this stack by searching up the DOM tree
      // then looking for a `.steps` (or .lists) within that container.
      let container =
        stack.closest(".d-md-flex") ||
        stack.closest(".how-to-use") ||
        stack.parentElement;
      let list = container
        ? container.querySelector(".steps, .lists, ul")
        : null;

      // If not found, also try previous siblings (fallback)
      if (!list) {
        let prev = stack.previousElementSibling;
        while (prev) {
          list = prev.querySelector?.(".steps, .lists, ul") || null;
          if (list) break;
          prev = prev.previousElementSibling;
        }
      }

      const stackItems = Array.from(stack.querySelectorAll("div"));
      if (!list) return; // no matching list found for this stack

      // find li elements that have data-target inside the found list
      const liItems = Array.from(list.querySelectorAll("li[data-target]"));

      // handlers (single reference for proper cleanup)
      const onEnter = (e) => {
        const target = Number(e.currentTarget.getAttribute("data-target"));
        // clear others in this stack
        stackItems.forEach((s) => s.classList.remove("active"));
        // nth-child mapping: 1 => index 0
        const targetDiv = stackItems[target - 1];
        if (targetDiv) targetDiv.classList.add("active");
      };
      const onLeave = () => {
        stackItems.forEach((s) => s.classList.remove("active"));
      };

      // attach listeners
      liItems.forEach((li) => {
        li.addEventListener("mouseenter", onEnter);
        li.addEventListener("mouseleave", onLeave);
      });

      // store references on stack element for cleanup later
      stack.__liListeners = { liItems, onEnter, onLeave };
    });

    // cleanup on unmount
    return () => {
      const stacks = Array.from(document.querySelectorAll(".stack"));
      stacks.forEach((stack) => {
        const info = stack.__liListeners;
        if (!info) return;
        info.liItems.forEach((li) => {
          li.removeEventListener("mouseenter", info.onEnter);
          li.removeEventListener("mouseleave", info.onLeave);
        });
        delete stack.__liListeners;
      });
    };
  }, []);

  return (
    <div className="row sections">
      <Sidebar />
      <div className="col-xl-9  col-md-12">
        <div className="gx-block" id="Dashboard">
          <div className="gx-card gx-page-block">
            <div className="gx-card-header">
              <p className="second-main-title">Dashboard</p>
              <div className="header-tools">
                <a href="#" className="gx-full-card">
                  <i className="ri-fullscreen-fill"></i>
                </a>
              </div>
            </div>
            <div className="gx-card-content">
              <div className="intero">
                <h1>Dashboard — overview & how to use it</h1>
                <p className="popins-data-helpex">
                  The Dashboard serves as the central control hub of your
                  web-application, a single, organized screen that offers an
                  overview of calls, appointments, and key performance
                  statistics, along with quick access to detailed tools through
                  the main menu. The following sections will guide you through
                  each visible component, explaining its purpose and the actions
                  you can perform. Designed for clarity and efficiency, the
                  Dashboard ensures smooth navigation and instant access to
                  essential information, helping you manage hospital operations
                  effortlessly.
                </p>
              </div>

              <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active"
                    id="preview2-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#preview2"
                    type="button"
                    role="tab"
                    aria-controls="preview2"
                    aria-selected="true"
                  >
                    <i className="ri-eye-line"></i> Preview
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="code2-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#code2"
                    type="button"
                    role="tab"
                    aria-controls="code2"
                    aria-selected="false"
                  >
                    <span className="material-symbols-outlined">build</span>{" "}
                    Usage
                  </button>
                </li>
              </ul>

              <div className="tab-content second-content" id="myTabContent">
                <div
                  className="tab-pane fade show active"
                  id="preview2"
                  role="tabpanel"
                  aria-labelledby="preview2-tab"
                >
                  <img
                    src="./assets/image/content/dashboard.png"
                    alt="not found"
                  />
                </div>

                <div
                  className="tab-pane fade"
                  id="code2"
                  role="tabpanel"
                  aria-labelledby="code2-tab"
                >
                  <h4>Account & Call </h4>
                  <p>
                    <strong>What it is:</strong>
                  </p>
                  <p>
                    This section provides a clear overview of your call
                    activity, remaining minutes, and Twilio number details,
                    allowing you to easily track and manage your package usage.
                  </p>
                  <p>
                    <strong>Description:</strong>
                  </p>
                  <ul className="lists">
                    <li>
                      Displays a personalized greeting with your username (e.g.,
                      “Hi, User”).
                    </li>
                    <li>
                      <strong>Platform Time Zone</strong> displays the current
                      date and time according to the time zone you selected
                      during account setup (e.g., "Asia/Dubai"). This ensures
                      all timestamps for appointments and reports are
                      standardized to your selected time zone.
                    </li>
                    <li>
                      Includes a date filter to review Call Activity, and Survey
                      Overview within selected ranges (Last 7 Days, Last 15
                      Days, Last 30 Days, or a Custom Range). The default time
                      filter is set to Last 7 days.
                    </li>

                    <li>
                      Shows the <strong>total number of calls made</strong> for
                      quick performance insight.
                    </li>
                    <li>
                      Displays the <strong>average call duration</strong>,
                      helping you understand typical call lengths.
                    </li>
                    <li>
                      Highlights <strong>today’s call count</strong> separately
                      (e.g., 9 calls made today).
                    </li>

                    <li>
                      Displays remaining AI call minutes via a circular progress
                      bar for intuitive tracking of your available balance. The
                      green segment represents remaining minutes, while the red
                      segment indicates used minutes. Total minutes are
                      prominently shown in the center. On hover, exact remaining
                      and used values appear in numbers for precise insight.
                      Additionally, remaining minutes are displayed separately
                      in percentage (e.g., 78% remaining) outside the circular
                      visual for quick reference.
                    </li>

                    <li>
                      Shows your <strong>Twilio number</strong>, the dedicated
                      phone number linked to your account.
                    </li>
                    <li>
                      Includes an <strong>“Add More Minutes”</strong> button
                      that redirects to the
                      <strong>Packages</strong> page, where you can upgrade your
                      plan by canceling the current subscription and purchasing
                      a new package with additional minutes.
                    </li>
                  </ul>

                  <h4>Total Appointments</h4>
                  <p>
                    <strong>What it is:</strong>
                  </p>
                  <p>
                    The <strong>Total Appointments</strong> card displays the
                    total number of appointments booked. By default, it shows
                    appointments for the current month, but you can use the
                    monthly filter to view previous months. This helps track
                    scheduling activity and identify trends.
                  </p>

                  <p>
                    <strong>Description:</strong>
                  </p>
                  <ul className="lists">
                    <li>
                      Automatically counts all appointments created in the
                      system.
                    </li>
                    <li>
                      Updates in real-time as new appointments are added,
                      regardless of their status.
                    </li>
                    <li>
                      Shows a visual graph with color-coded segments for each
                      department.
                    </li>
                    <li>
                      The top 5 departments with the highest number of
                      appointments are displayed individually. All other
                      departments with fewer appointments are grouped under
                      Others for a clear, focused view.
                    </li>
                    <li>
                      <strong>Default filter:</strong> Current Month.
                    </li>
                  </ul>

                  <h4>Survey Overview</h4>
                  <p>
                    <strong>What it is:</strong>
                  </p>
                  <p>
                    The <strong>Survey Overview</strong> card presents a summary
                    of feedback ratings, offering insights into overall service
                    quality and patient satisfaction.
                  </p>

                  <p>
                    <strong>Description:</strong>
                  </p>
                  <ul className="lists">
                    <li>
                      Displays the <strong>overall average rating</strong>{" "}
                      (e.g., 4.35) for a quick performance snapshot.
                    </li>
                    <li>
                      Breaks down ratings into key categories:
                      <ul className="lists">
                        <li>
                          <strong>Average Call Quality Rating</strong> –
                          feedback from patients or callers after interacting
                          with the AI call system (e.g., 4.5).
                        </li>
                        <li>
                          <strong>Average Needs Addressed Rating</strong> –
                          feedback collected from patient responses during the
                          call about how well their needs were understood and
                          addressed by EVA (e.g., 4.2).
                        </li>
                      </ul>
                    </li>
                    <li>
                      Shows the{" "}
                      <strong>
                        total number of users who submitted ratings
                      </strong>{" "}
                      (e.g., 300 respondents), providing a clear measure of
                      engagement and satisfaction.
                    </li>
                  </ul>

                  <h4>Call Statistics</h4>
                  <p>
                    <strong>What it is:</strong>
                  </p>
                  <p>
                    The <strong>Call Statistics</strong> card tracks all calls
                    made through the system on a monthly basis, helping you
                    analyze overall calling performance and response trends in
                    that duration.
                  </p>

                  <p>
                    <strong>Description:</strong>
                  </p>
                  <ul className="lists">
                    <li>
                      Displays two key metrics through interactive progress
                      charts:
                      <ul className="lists">
                        <li>
                          <strong>Total Calls</strong> – the total number of
                          calls made, represented by solid vertical bars on the
                          chart.
                        </li>
                        <li>
                          <strong>Received Calls</strong> – the number of
                          successfully answered calls, shown as a highlighted
                          progress line for easy comparison.
                        </li>
                      </ul>
                    </li>
                    <li>
                      Includes a <strong>dropdown filter</strong> that allows
                      you to view and compare call data for any specific month
                      as needed.
                    </li>
                  </ul>

                  <h4>Calendar Appointments</h4>
                  <p>
                    <strong>What it is:</strong>
                  </p>
                  <p>
                    The <strong>Calendar Appointments</strong> card provides a
                    quick overview of all scheduled appointments, giving instant
                    insight into booking activity.
                  </p>

                  <p>
                    <strong>Description:</strong>
                  </p>
                  <ul className="lists">
                    <li>
                      Shows the total number of appointments in the system.
                    </li>
                    <li>
                      Separates counts into:
                      <ul className="lists">
                        <li>
                          <strong>New Appointments</strong> – upcoming scheduled
                          bookings
                        </li>
                        <li>
                          <strong>Past/Missed Appointments</strong> – cancelled
                          or expired bookings
                        </li>
                        <li>
                          <strong>Completed Appointments</strong> – all
                          successfully completed bookings
                        </li>
                      </ul>
                    </li>
                    <li>
                      Includes a circular progress indicator to visualize the
                      percentage of completed appointments.
                    </li>
                    <li>
                      Updates automatically as appointments are added or
                      completed, ensuring real-time accuracy.
                    </li>
                  </ul>

                  <h4>Today Appointments</h4>
                  <p>
                    <strong>What it is:</strong>
                  </p>
                  <p>
                    The Today Appointments' section provides a comprehensive
                    overview of all patient appointments scheduled for the
                    current day. It enables hospital staff to efficiently
                    monitor, manage, and track appointment activities in real
                    time, ensuring smooth operations and timely patient handling
                    throughout the day.
                  </p>

                  <p>
                    <strong>Description:</strong>
                  </p>
                  <p>
                    Each record represents a patient appointment with complete
                    details, including:
                  </p>
                  <ul className="lists">
                    <li>
                      <strong>Patient Name, Email, and Contact Number</strong>{" "}
                      (e.g., Jack Smith, jack@gmail.com, +92 99939393).
                    </li>
                    <li>
                      <strong>Appointment Date and Time</strong> (scheduled
                      slot).
                    </li>
                    <li>
                      <strong>Assigned Doctor and Department</strong> (e.g., Dr.
                      John Dae – Cardiology).
                    </li>
                    <li>
                      <strong>Appointment Status</strong> (e.g., Confirmed,
                      Completed, or Canceled).
                    </li>
                    <li>
                      <strong>Call Record</strong> (displayed if available,
                      otherwise shown as N/A).
                    </li>
                    <li>
                      <strong>Contact Field</strong> for quick communication via
                      email, WhatsApp, or direct call.
                    </li>
                  </ul>
                  <p>
                    The table supports <strong>searching</strong> by patient
                    name, email, contact number, or status and allows{" "}
                    <strong>sorting</strong> based on selected fields (patient
                    name, email, contact number, or status). Data is displayed
                    in a <strong>paginated format</strong> (e.g., Showing 20 to
                    30 of 100 entries) to ensure smooth navigation through large
                    datasets.
                  </p>

                  <h4>Side Menu</h4>
                  <p>
                    <strong>What it is:</strong>
                  </p>
                  <p>
                    {" "}
                    The Side Menu serves as the main navigation panel of the
                    TalkRight web-application. It remains visible on the screen
                    at all times, allowing users to quickly access key sections
                    without switching pages.{" "}
                  </p>

                  <p>
                    <strong>Description:</strong>
                  </p>
                  <ul className="lists">
                    <li>
                      <strong>Dashboard:</strong> Provides an overview of key
                      metrics, including calls, appointments, and performance
                      insights.
                    </li>
                    <li>
                      <strong>Calendar:</strong> Allows staff to view and manage
                      appointments based on doctor availability and department
                      schedules.
                    </li>
                    <li>
                      <strong>Appointment:</strong> Displays all booked
                      appointments with filtering and sorting options for easy
                      management.
                    </li>
                    <li>
                      <strong>Incoming Call:</strong> Shows a complete log of
                      all received calls with caller details and response
                      status.
                    </li>
                    <li>
                      <strong>Reviews:</strong> Contains patient and caller
                      feedback, helping assess satisfaction and service quality.
                    </li>
                    <li>
                      <strong>Report:</strong> Displays detailed appointment and
                      call data for review and tracking.
                    </li>
                    <li>
                      <strong>Doctor Management:</strong> Enables management of
                      departments and managing doctor profiles, shifts, and
                      leave schedules.
                    </li>
                    <li>
                      <strong>Clinic Management:</strong> Manages clinic
                      timings, weekly offs, and special leave days.
                    </li>
                    <li>
                      <strong>Billing:</strong> Provides subscription details,
                      package management, and purchase history & allows to
                      purchase twillio number once.
                    </li>
                    <li>
                      <strong>Templates Management:</strong> Allows editing and
                      configuring Email, WhatsApp, and Poll templates for
                      communication.
                    </li>
                    <li>
                      <strong>System Settings:</strong> Offers access to system
                      configurations such as WhatsApp setup, cron job
                      scheduling, and branding options.
                    </li>
                    <li>
                      <strong>Profile Menu:</strong> The Profile Menu provides
                      quick access to all account-related settings and personal
                      information. It allows users to view their profile, update
                      personal and business details, change their password, and
                      securely log out. This centralized menu ensures easy
                      management of user data and account preferences.
                    </li>
                  </ul>

                  <h4>Profile Menu</h4>
                  <p>
                    <strong>What it is:</strong>
                  </p>
                  <p>
                    The Profile Menu provides quick access to all
                    account-related settings and personal information. It allows
                    users to view their profile, update personal and business
                    details, change their password, and securely log out. This
                    centralized menu ensures easy management of user data and
                    account preferences.
                  </p>

                  <p>
                    <em>
                      The detailed description and usage instructions for the
                      Profile Menu are provided at the end of the{" "}
                      <strong>System Features</strong> section. You can refer to
                      it for a quick review and better understanding.
                    </em>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="gx-block" id="calender">
          <div className="gx-card gx-page-block">
            <div className="gx-card-header">
              <p className="second-main-title">Calendar</p>

              <div className="header-tools">
                <a href="#" className="gx-full-card">
                  <i className="ri-fullscreen-fill"></i>
                </a>
              </div>
            </div>
            <div className="gx-card-content">
              <div className="intero">
                <h1>Calendar</h1>
                <p className="popins-data-helpex">
                  The Calendar provides a clear and organized view of all
                  appointments, enabling hospital staff to manage schedules
                  efficiently. New appointments can be added manually based on
                  patient needs and doctor availability. Existing bookings can
                  be easily updated, rescheduled, or deleted when changes occur,
                  ensuring the timetable remains accurate and up to date.
                </p>
                <ul className="nav nav-tabs mt-5" id="myTab2" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link active"
                      id="preview4-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#preview4"
                      type="button"
                      role="tab"
                      aria-controls="preview4"
                      aria-selected="false"
                      tabIndex="-1"
                    >
                      <i className="ri-eye-line"></i>Preview
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link "
                      id="code-tab5"
                      data-bs-toggle="tab"
                      data-bs-target="#code5"
                      type="button"
                      role="tab"
                      aria-controls="code5"
                      aria-selected="true"
                    >
                      <span className="material-symbols-outlined">build</span>
                      Usage
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link "
                      id="code-tab6"
                      data-bs-toggle="tab"
                      data-bs-target="#code6"
                      type="button"
                      role="tab"
                      aria-controls="code6"
                      aria-selected="true"
                    >
                      <span className="material-symbols-outlined">
                        menu_book
                      </span>
                      How to Use
                    </button>
                  </li>
                </ul>
                <div className="tab-content second-content" id="myTabContent">
                  <div
                    className="tab-pane fade show active"
                    id="preview4"
                    role="tabpanel"
                    aria-labelledby="preview4-tab"
                  >
                    <img
                      src="./assets/image/content/calender-img.png"
                      alt="not found"
                    />
                  </div>

                  <div
                    className="tab-pane fade"
                    id="code5"
                    role="tabpanel"
                    aria-labelledby="code5-tab"
                  >
                    <p>
                      <strong>What it is:</strong>
                    </p>
                    <p>
                      The <strong>Calendar</strong> is a centralized tool for
                      managing all patient appointments. It allows you to view
                      all the created appointments & to create a new appointment
                      allows you to select any date, assign doctor and their
                      departments, enter patient information, and further allows
                      you to update or delete appointments as needed.
                    </p>

                    <p>
                      <strong>Description:</strong>
                    </p>
                    <p>
                      The Calendar offers a clear monthly view where all
                      appointments are displayed by date.
                    </p>
                    <ul className="lists">
                      <li>
                        <strong>Add Appointment</strong> → Opens a form to
                        create a new booking by entering
                        <strong>patient details, doctor information</strong>,
                        and selecting the{" "}
                        <strong>appointment date and time</strong>.
                      </li>
                      <li>
                        Each booked slot shows the{" "}
                        <strong>patient’s name</strong> and uses the{" "}
                        <strong>doctor’s assigned color</strong> (from Doctor
                        Management) for easy identification.
                      </li>
                      <li>
                        Clicking on an appointment block displays detailed
                        information with the following options:
                        <ul className="lists">
                          <li className="lists-none">
                            <div className="d-flex align-items-center gap-2 ">
                              <span className="material-symbols-outlined">
                                arrow_forward
                              </span>
                              <span>
                                <strong>Update</strong>: Save any modifications.
                              </span>
                            </div>
                          </li>
                          <li className="lists-none">
                            <div className="d-flex align-items-center gap-2 ">
                              <span className="material-symbols-outlined">
                                arrow_forward
                              </span>
                              <span>
                                <strong>Reset</strong>: Clear all the altered
                                data and restore default values.
                              </span>
                            </div>
                          </li>
                          <li className="lists-none">
                            <div className="d-flex align-items-center gap-2 ">
                              <span className="material-symbols-outlined">
                                arrow_forward
                              </span>
                              <span>
                                <strong>Delete (Trash Icon)</strong>:
                                Permanently remove the appointment.
                              </span>
                            </div>
                          </li>
                        </ul>
                      </li>
                      <li>
                        <strong>Mini Calendar</strong>: Lets you view or jump to
                        a specific day or month.
                      </li>
                    </ul>

                    <p>
                      <strong>Additional Features:</strong>
                    </p>

                    <ul className="lists">
                      <li>
                        <strong>Past Date Restriction:</strong> The system
                        prevents creating appointments on past dates and
                        displays a warning if attempted.
                      </li>
                      <li>
                        <strong>Doctor Filtering:</strong> Checkboxes beside the
                        calendar let you filter and view specific doctor's
                        appointments, or use the <strong>View All</strong>{" "}
                        option to display all appointments in the calendar.
                      </li>
                      <li>
                        <strong>Calendar View Categories:</strong> Switch
                        between <strong>Month</strong>,<strong>Week</strong>,{" "}
                        <strong>Day</strong>, or <strong>List</strong> views for
                        flexible schedule management.
                      </li>
                      <li>
                        <strong>Drag and Drop Functionality:</strong> To update
                        an appointment’s date, simply drag the appointment from
                        the current date to the desired one. The system will
                        automatically update it if the doctor’s slot is
                        available on the new date.
                      </li>
                    </ul>
                  </div>

                  <div
                    className="tab-pane fade how-to-use  "
                    id="code6"
                    role="tabpanel"
                    aria-labelledby="code6-tab"
                  >
                    <div className="d-md-flex justify-content-md-between col-md-10 col-11  ">
                      <div className="col-12 col-md-11 col-lg-7  ">
                        <p className="">
                          <strong>How to Use It:</strong>
                        </p>
                        <ul className="steps lists ">
                          <li data-target="10" className="cursor-pointer">
                            Open the <strong>Calendar</strong> and click on your
                            preferred date.
                            <div>
                              <img
                                className="mobile-step-img"
                                src="assets/image/content/James.png"
                                alt=""
                              />
                            </div>
                          </li>
                          <li data-target="2" className="cursor-pointer">
                            Enter the <strong>doctor</strong>,
                            <strong>department</strong>, and{" "}
                            <strong>patient details</strong>.
                            <div>
                              {" "}
                              <img
                                className="mobile-step-img"
                                src="assets/image/content/details.png"
                                alt=""
                              />
                            </div>
                          </li>
                          <li data-target="3" className="cursor-pointer">
                            Click <strong>Add Appointment</strong> to save it in
                            the system.
                            <div>
                              <img
                                className="mobile-step-img"
                                src="assets/image/content/add.png"
                                alt=""
                              />
                            </div>
                          </li>
                          <li className="cursor-pointer">
                            To view booked appointments, click the{" "}
                            <strong>patient name</strong> (displayed in the
                            doctor’s assigned color). A form will appear showing
                            appointment details where you can:
                            <ul className="lists ">
                              <li data-target="4">
                                Click <strong>Update</strong> to save changes
                                after updating data.
                                <div>
                                  {" "}
                                  <img
                                    className="mobile-step-img"
                                    src="assets/image/content/update-btn.png"
                                    alt=""
                                  />
                                </div>
                              </li>
                              <li data-target="6">
                                Click <strong>Reset</strong> to restore default
                                field values.
                                <div>
                                  {" "}
                                  <img
                                    className="mobile-step-img"
                                    src="assets/image/content/reset.png"
                                    alt=""
                                  />
                                </div>
                              </li>
                              <li data-target="5">
                                Click <strong>Trash Icon</strong> at top right
                                next to the exit button to delete the
                                appointment.
                                <div>
                                  {" "}
                                  <img
                                    className="mobile-step-img"
                                    src="assets/image/content/update.png"
                                    alt=""
                                  />
                                </div>
                              </li>
                            </ul>
                          </li>
                          <li data-target="7" className="cursor-pointer">
                            {" "}
                            To <strong>reschedule</strong>, drag and drop the
                            appointment to the preferred date. The system will
                            update it automatically if the slot is available.
                            <div>
                              {" "}
                              <img
                                className="mobile-step-img"
                                src="assets/image/content/miniCal.png"
                                alt=""
                              />{" "}
                            </div>
                          </li>
                          <li data-target="7" className="cursor-pointer">
                            Use the <strong>Mini Calendar</strong> on the right
                            to jump to any date.
                            <div>
                              {" "}
                              <img
                                className="mobile-step-img"
                                src="assets/image/content/miniCal.png"
                                alt=""
                              />{" "}
                            </div>
                          </li>
                          <li data-target="8" className="cursor-pointer">
                            {" "}
                            Use <strong>Navigation Controls</strong>
                            (left/right arrows or month title) to switch between
                            months.
                            <div>
                              {" "}
                              <img
                                className="mobile-step-img"
                                src="assets/image/content/Calender.png"
                                alt=""
                              />
                            </div>
                          </li>
                          <li data-target="9" className="cursor-pointer">
                            Switch between <strong>Month</strong>,
                            <strong>Week</strong>, <strong>Day</strong>, or{" "}
                            <strong>List</strong> view as needed.
                            <div>
                              <img
                                className="mobile-step-img"
                                src="assets/image/content/day"
                                alt=""
                              />
                            </div>
                          </li>
                          <li data-target="1" className="cursor-pointer">
                            Select <strong>Checkboxes</strong> having doctors'
                            list beside calendar to view specific appointments,
                            or choose <strong>View All</strong> to display all
                            appointments on the calendar.
                            <div>
                              <img
                                className="mobile-step-img"
                                src="assets/image/content/Event Doctors.png"
                                alt=""
                              />
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div className="col-4 ">
                        <div className="stack">
                          <div>
                            <img src="assets/image/content/Event Doctors.png" />
                          </div>
                          <div>
                            <img
                              src="assets/image/content/details.png"
                              style={{ objectFit: "contain" }}
                              alt=""
                            />
                          </div>
                          <div>
                            <img src="assets/image/content/add.png" alt="" />
                          </div>
                          <div>
                            <img src="assets/image/content/update-btn.png" />
                          </div>
                          <div>
                            <img
                              src="assets/image/content/update.png"
                              style={{ objectFit: "contain" }}
                              alt=""
                            />
                          </div>
                          <div>
                            <img src="assets/image/content/reset.png" alt="" />
                          </div>
                          <div>
                            <img
                              src="assets/image/content/miniCal.png"
                              alt=""
                            />
                          </div>
                          <div>
                            <img
                              src="assets/image/content/Calender.png"
                              alt=""
                            />
                          </div>
                          <div>
                            <img
                              src="assets/image/content/dayweek.PNG"
                              style={{ objectFit: "contain" }}
                              alt=""
                            />
                          </div>
                          <div>
                            <img src="assets/image/content/James.png" alt="" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="gx-block" id="Appointements">
          <div className="gx-card gx-page-block">
            <div className="gx-card-header">
              <p className="second-main-title">Appointments</p>
              <div className="header-tools">
                <a href="#" className="gx-full-card">
                  <i className="ri-fullscreen-fill"></i>
                </a>
              </div>
            </div>
            <div className="gx-card-content">
              <div className="intero">
                <h1>Appointments</h1>
                <p className="popins-data-helpex">
                  The <strong>Appointments</strong> section provides a
                  comprehensive view of all scheduled bookings in one place. It
                  allows you to quickly <strong>view, search,</strong> and{" "}
                  <strong>track</strong> appointment details, including the{" "}
                  <strong>
                    Appointment ID, department, doctor’s name, appointment
                    creation date and time, appointment date and time,
                  </strong>{" "}
                  and <strong>patient information</strong> such as name, phone
                  number, and email. You can also monitor the status of each
                  appointment, whether it’s confirmed, completed, or canceled.
                  This section ensures that all appointments remain
                  well-organized, easily accessible, and efficiently managed for
                  smooth clinic operations.
                  <strong>
                    department, doctor’s name, appointment date and time,
                  </strong>{" "}
                  and
                  <strong>patient information</strong> such as name, phone
                  number, and email. You can also monitor the
                  <strong>status</strong>
                  of each appointment, whether it’s confirmed, completed, or
                  canceled. This section ensures that all appointments remain
                  well-organized, easily accessible, and efficiently managed for
                  smooth clinic operations.
                </p>

                <ul className="nav nav-tabs mt-5" id="myTab3" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link active"
                      id="preview5-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#preview5"
                      type="button"
                      role="tab"
                      aria-controls="preview5"
                      aria-selected="true"
                    >
                      <i className="ri-eye-line"></i> Preview
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="code-tab7"
                      data-bs-toggle="tab"
                      data-bs-target="#code7"
                      type="button"
                      role="tab"
                      aria-controls="code7"
                      aria-selected="false"
                    >
                      <span className="material-symbols-outlined">build</span>{" "}
                      Usage
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="code-tab8"
                      data-bs-toggle="tab"
                      data-bs-target="#code8"
                      type="button"
                      role="tab"
                      aria-controls="code8"
                      aria-selected="false"
                    >
                      <span className="material-symbols-outlined">
                        menu_book
                      </span>{" "}
                      How to Use
                    </button>
                  </li>
                </ul>

                <div className="tab-content second-content" id="myTabContent">
                  <div
                    className="tab-pane fade show active"
                    id="preview5"
                    role="tabpanel"
                    aria-labelledby="preview5-tab"
                  >
                    <img
                      src="./assets/image/content/appointment-img.png"
                      alt="Appointments preview not found"
                    />
                  </div>

                  <div
                    className="tab-pane fade"
                    id="code7"
                    role="tabpanel"
                    aria-labelledby="code7-tab"
                  >
                    <p className="">
                      <strong>What it is:</strong>
                    </p>
                    <p className="">
                      The Appointments section provides a centralized view to
                      manage and monitor all patient bookings. It displays
                      appointment information in a clear, structured table,
                      allowing hospital staff to quickly review, update, or
                      filter schedules as needed.
                    </p>

                    <p>
                      <strong>Description:</strong>
                    </p>
                    <ul className="lists ">
                      <li>
                        <strong>Appointment Details:</strong> View all booked
                        appointments in a single, organized interface, each
                        displayed with a unique Appointment ID.
                      </li>
                      <li>
                        <strong>Patient Information:</strong> Includes Name,
                        Email, and Phone Number for easy identification and
                        communication. Clicking the phone number instantly
                        displays all relevant reservations linked to that
                        patient (past, present, and upcoming).
                      </li>
                      <li>
                        <strong>Appointment Timing:</strong> Displays both the{" "}
                        <strong>booking date & time</strong>
                        and the{" "}
                        <strong>scheduled appointment date & time</strong>.
                      </li>
                      <li>
                        <strong>Doctor & Department:</strong> Shows the{" "}
                        <strong>assigned doctor</strong> and their
                        <strong>department</strong> (e.g., Dermatology,
                        Cardiology).
                      </li>
                      <li>
                        <strong>Status:</strong> Indicates the current
                        appointment status (Scheduled, Completed, Cancelled, or
                        Confirmed).
                      </li>
                      <li>
                        <strong>Contact Options:</strong>
                        <ul className="lists">
                          <li>
                            <strong>Email Icon:</strong> Redirects to your email
                            client to send an email directly.
                          </li>
                          <li>
                            <strong>WhatsApp Icon:</strong> Opens WhatsApp to
                            send a message to the patient.
                          </li>
                          <li>
                            <strong>Message Icon:</strong> Opens a pop-up to
                            choose another app from your system for sending
                            messages.
                          </li>
                        </ul>
                      </li>
                      <li>
                        <strong>Search & Filter:</strong>
                        <ul className="lists">
                          <li>
                            Use the <strong>Search Bar</strong> to find patients
                            by name, phone number, mail.
                          </li>
                          <li>
                            Use the <strong>Filter Dropdown</strong> to view
                            appointments based on their status (Scheduled,
                            Completed, Cancelled, or Confirmed).
                          </li>
                        </ul>
                      </li>
                      <li>
                        <strong>Pagination:</strong> Displays the total number
                        of visible entries (e.g., “Showing 10 to 20 of 100
                        entries”) for organized navigation through records.
                      </li>
                    </ul>
                  </div>

                  <div
                    className="tab-pane fade how-to-use"
                    id="code8"
                    role="tabpanel"
                    aria-labelledby="code8-tab"
                  >
                    <div className="d-md-flex justify-content-md-between  col-md-10 col-11  ">
                      <div className="col-12 col-md-11 col-lg-7  ">
                        <p>
                          <strong>How to Use:</strong>
                        </p>
                        <ul className="lists steps">
                          <li data-target="12" className="cursor-pointer">
                            Open the Appointments section to view all booked
                            appointments in a single list, each displayed with
                            its unique Appointment ID.
                            <div>
                              <img
                                className="mobile-step-img"
                                src="assets/image/content/appointementImg.png"
                                style={{ objectFit: "contain" }}
                                alt=""
                              />
                            </div>
                          </li>
                          <li data-target="2" className="cursor-pointer">
                            Review <strong>patient details</strong> (name,
                            email, and phone number).
                            <div>
                              <img
                                className="mobile-step-img"
                                src="assets/image/content/Appointdetails.png"
                                style={{ objectFit: "contain" }}
                                alt=""
                              />
                            </div>
                          </li>
                          <li data-target="3" className="cursor-pointer">
                            Click the phone number listed in the Appointments to
                            view all reservations linked to a patient (past,
                            present, and upcoming).
                            <div>
                              <img
                                className="mobile-step-img"
                                src="assets/image/content/numberlisted.png"
                                style={{ objectFit: "contain" }}
                                alt=""
                              />
                            </div>
                          </li>
                          <li data-target="4" className="cursor-pointer">
                            Check <strong>appointment timing</strong>, including
                            both booking and scheduled date/time.
                            <div>
                              <img
                                className="mobile-step-img"
                                src="assets/image/content/AppointDate.jpeg"
                                style={{ objectFit: "contain" }}
                                alt=""
                              />
                            </div>
                          </li>
                          <li data-target="5" className="cursor-pointer">
                            View the <strong>assigned doctor</strong> and their
                            <strong>department</strong> for each appointment.
                            <div>
                              <img
                                className="mobile-step-img"
                                src="assets/image/content/AppointDoc.jpeg"
                                style={{ objectFit: "contain" }}
                                alt=""
                              />
                            </div>
                          </li>
                          <li data-target="6" className="cursor-pointer">
                            Update or verify the <strong>status</strong>
                            (Confirmed, Completed, or Cancelled).
                            <div>
                              <img
                                className="mobile-step-img"
                                src="assets/image/content/AppointStatus.jpeg"
                                style={{ objectFit: "contain" }}
                                alt=""
                              />
                            </div>
                          </li>
                          <li className="cursor-pointer">
                            Use the <strong>contact icons</strong> to
                            communicate with patients:
                            <ul className="lists">
                              <li data-target="7 " className="cursor-pointer">
                                <strong>Email Icon:</strong> Send an email
                                directly.
                                <div>
                                  <img
                                    className="mobile-step-img"
                                    src="assets/image/content/Gmail.png"
                                    style={{ objectFit: "contain" }}
                                    alt=""
                                  />
                                </div>
                              </li>
                              <li data-target="8" className="cursor-pointer">
                                <strong>WhatsApp Icon:</strong> Send a message
                                via WhatsApp.
                                <div>
                                  <img
                                    className="mobile-step-img"
                                    src="assets/image/content/Whatsapp.png"
                                    style={{ objectFit: "contain" }}
                                    alt=""
                                  />
                                </div>
                              </li>
                              <li data-target="9" className="cursor-pointer">
                                <strong>Message Icon:</strong> Use another
                                available messaging app from your system.
                                <div>
                                  <img
                                    className="mobile-step-img"
                                    src="assets/image/content/message.png"
                                    style={{ objectFit: "contain" }}
                                    alt=""
                                  />
                                </div>
                              </li>
                            </ul>
                          </li>
                          <li data-target="10">
                            Use the <strong>Search Bar</strong> to find patients
                            by name, email, phone number.
                            <div>
                              <img
                                className="mobile-step-img"
                                src="assets/image/content/searchbar.png"
                                style={{ objectFit: "contain" }}
                                alt=""
                              />
                            </div>
                          </li>
                          <li data-target="11">
                            Apply the <strong>Filter Dropdown</strong> to sort
                            appointments by their status.
                            <div>
                              <img
                                className="mobile-step-img"
                                src="assets/image/content/statusdrop.png"
                                style={{ objectFit: "contain" }}
                                alt=""
                              />
                            </div>
                          </li>
                          <li data-target="1">
                            Use the <strong>Pagination Controls</strong>{" "}
                            (left/right arrows) at the bottom to navigate
                            between entries and view the total number of records
                            displayed.
                            <div>
                              <img
                                className="mobile-step-img"
                                src="assets/image/content/pagination.png"
                                style={{ objectFit: "contain" }}
                                alt=""
                              />
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div className="col-4 ">
                        <div className="stack ">
                          <div>
                            <img
                              src="assets/image/content/pagination.png"
                              style={{ objectFit: "contain" }}
                              alt=""
                            />
                          </div>
                          <div>
                            <img
                              src="assets/image/content/Appointdetails.png"
                              style={{ objectFit: "contain" }}
                              alt=""
                            />
                          </div>
                          <div>
                            <img
                              src="assets/image/content/numberlisted.png"
                              style={{ objectFit: "contain" }}
                              alt=""
                            />
                          </div>
                          <div>
                            <img
                              src="assets/image/content/AppointDate.jpeg"
                              alt=""
                            />
                          </div>
                          <div>
                            <img
                              src="assets/image/content/AppointDoc.jpeg"
                              alt=""
                            />
                          </div>
                          <div>
                            <img
                              src="assets/image/content/AppointStatus.jpeg"
                              alt=""
                            />
                          </div>
                          <div>
                            <img
                              src="assets/image/content/Gmail.png"
                              style={{ objectFit: "contain" }}
                              alt=""
                            />
                          </div>
                          <div>
                            <img
                              src="assets/image/content/Whatsapp.png"
                              style={{ objectFit: "contain" }}
                              alt=""
                            />
                          </div>
                          <div>
                            <img
                              src="assets/image/content/message.png"
                              style={{ objectFit: "contain" }}
                            />
                          </div>
                          <div>
                            <img
                              src="assets/image/content/searchbar.png"
                              alt=""
                              style={{ objectFit: "contain" }}
                            />
                          </div>
                          <div>
                            <img
                              src="assets/image/content/statusdrop.png"
                              alt=""
                              style={{ objectFit: "contain" }}
                            />
                          </div>
                          <div>
                            <img
                              src="assets/image/content/appointementImg.png"
                              alt=""
                              style={{ objectFit: "contain" }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="gx-block" id="IncomingCalls">
          <div className="gx-card gx-page-block">
            <div className="gx-card-header">
              <p className="second-main-title">Incoming Calls</p>
              <div className="header-tools">
                <a href="#" className="gx-full-card">
                  <i className="ri-fullscreen-fill"></i>
                </a>
              </div>
            </div>
            <div className="gx-card-content">
              <div className="intero">
                <h1>Incoming Calls</h1>
                <p className="popins-data-helpex">
                  The Incoming Calls section displays a complete log of all
                  received calls with caller details such as name, email,
                  number, date, time, duration, and assigned doctor. You can
                  filter calls by date range, search specific entries, play or
                  download call recordings, and adjust the pagination from the
                  top-right dropdown to manage how many records are shown per
                  page.
                </p>

                <ul className="nav nav-tabs mt-5" id="myTab4" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link active"
                      id="preview6-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#preview6"
                      type="button"
                      role="tab"
                      aria-controls="preview6"
                      aria-selected="true"
                    >
                      <i className="ri-eye-line"></i> Preview
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="code-tab9"
                      data-bs-toggle="tab"
                      data-bs-target="#code9"
                      type="button"
                      role="tab"
                      aria-controls="code9"
                      aria-selected="false"
                    >
                      <span className="material-symbols-outlined">build</span>{" "}
                      Usage
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="code-tab10"
                      data-bs-toggle="tab"
                      data-bs-target="#code10"
                      type="button"
                      role="tab"
                      aria-controls="code10"
                      aria-selected="false"
                    >
                      <span className="material-symbols-outlined">
                        menu_book
                      </span>{" "}
                      How to Use
                    </button>
                  </li>
                </ul>

                <div className="tab-content second-content" id="myTabContent">
                  <div
                    className="tab-pane fade show active"
                    id="preview6"
                    role="tabpanel"
                    aria-labelledby="preview6-tab"
                  >
                    <img
                      src="./assets/image/content/call-img.png"
                      alt="Incoming Calls preview not found"
                    />
                  </div>

                  <div
                    className="tab-pane fade"
                    id="code9"
                    role="tabpanel"
                    aria-labelledby="code9-tab"
                  >
                    <p>
                      <strong>What it is:</strong>
                    </p>
                    <p className="">
                      The <strong>Incoming Calls</strong> section provides a
                      complete, searchable record of all inbound calls received
                      through the system. It includes caller identity and
                      contact details, call timing and duration, and the
                      internal staff or department the call was routed to. You
                      can quickly <strong>filter calls by date range</strong> or
                      use the
                      <strong>search bar</strong> to find specific entries by
                      name, email, or phone number. Each entry also offers{" "}
                      <strong>quick actions</strong> to listen to or contact the
                      caller directly.
                    </p>

                    <p>
                      <strong>Description:</strong>
                    </p>
                    <ul className="lists">
                      <li>
                        <strong>Header and Controls:</strong>
                        <ul className="lists">
                          <li>
                            <strong>Date Range Picker:</strong> Located at the
                            top-right to filter calls within a specific time
                            frame.
                          </li>
                          <li>
                            <strong>Search Calls:</strong> Search box for quick
                            filtering by caller name, email, or phone number.
                          </li>
                          <li>
                            <strong>Page Length Dropdown:</strong> Adjust how
                            many records are displayed per page (options include
                            10, 25, 50, or 100).
                          </li>
                        </ul>
                      </li>
                      <li>
                        <strong>Main Table Columns:</strong>
                        <ul className="lists">
                          <li>
                            <strong># –</strong> Serial number of each entry.
                          </li>

                          <li>
                            <strong>Email –</strong> Caller’s email address.
                          </li>
                          <li>
                            <strong>Number –</strong> The caller number is
                            displayed. If an appointment is reserved from the
                            call and the patient’s contact number is later
                            modified, the original caller number remains
                            unchanged and unaffected.
                          </li>
                          <li>
                            <strong>Date –</strong> Date of the call (formatted
                            to match the Date Range filter).
                          </li>
                          <li>
                            <strong>Time –</strong> Call start time (in the
                            system's local timezone).
                          </li>
                          <li>
                            <strong>Duration –</strong> Length of the call.
                          </li>
                          <li>
                            <strong>To Whom –</strong> Displays the clinic's
                            center number if no appointment was booked from the
                            call. If an appointment was successfully reserved,
                            it shows the assigned doctor's name instead.
                          </li>
                          <li>
                            <strong>Full Call –</strong> Provides audio playback
                            of the recorded call.
                            <ul className="lists">
                              <li>
                                You can <strong>listen</strong> to call
                                recordings directly from the table.
                              </li>
                              <li>
                                You can <strong>download</strong> recordings for
                                review or documentation.
                              </li>
                              <li>
                                Call recordings are recorded with callers’
                                consent.
                              </li>
                            </ul>
                          </li>
                          <li>
                            <strong>Contact –</strong> Action icons for
                            reconnecting with the caller:
                            <ul className="lists">
                              <li>
                                <strong>Email Icon:</strong> Opens your default
                                email client to send a message.
                              </li>
                              <li>
                                <strong>WhatsApp Icon:</strong> Enables direct
                                WhatsApp messaging with the caller.
                              </li>
                              <li>
                                <strong>Message Icon:</strong> Prompts a pop-up
                                to choose an app from your system to send a
                                message.
                              </li>
                            </ul>
                          </li>
                          <li>
                            <strong>Sorting:</strong> Use the up and down arrows
                            in the column headers to sort records.
                          </li>
                        </ul>
                      </li>

                      <li>
                        <strong>Pagination & Record Summary:</strong>
                        <ul className="lists">
                          <li>
                            <strong>Bottom-Left:</strong> Displays a summary
                            such as “Showing 1 to 10 of 30 entries,” updating
                            dynamically based on filters and page number.
                          </li>
                          <li>
                            <strong>Bottom-Right:</strong> Contains pagination
                            controls (First, Previous, Next, Last) to navigate
                            through pages.
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>

                  <div
                    className="tab-pane fade how-to-use"
                    id="code10"
                    role="tabpanel"
                    aria-labelledby="code10-tab"
                  >
                    <div className="d-md-flex justify-content-md-between col-md-10 col-11  ">
                      <div className="col-12 col-md-11 col-lg-7  ">
                        <p>
                          <strong>How to Use:</strong>
                        </p>

                        <ul className="lists steps">
                          <li data-target="10" className="cursor-pointer">
                            <strong>Open Incoming Calls:</strong> When you open
                            this section, it displays calls within the system’s
                            default date range (e.g., 09/12/2025 – 09/13/2025).
                            <div>
                              <img
                                src="assets/image/content/incomingcall.png"
                                className="mobile-step-img"
                                style={{ objectFit: "contain" }}
                                alt=""
                              />
                            </div>
                          </li>

                          <li data-target="2" className="cursor-pointer">
                            <strong>Set a Date Range:</strong> Click the
                            <strong>Date Range</strong> control at the top-right
                            to select your desired start and end dates. The
                            table will automatically update to show only the
                            calls made within that range.
                            <div>
                              <img
                                src="assets/image/content/dateRange.png"
                                className="mobile-step-img"
                                style={{ objectFit: "contain" }}
                                alt=""
                              />
                            </div>
                          </li>

                          <li data-target="3" className="cursor-pointer">
                            <strong>Search Calls:</strong> Use the
                            <strong>Search Calls</strong> bar to quickly find a
                            caller by name, phone number, or email. Results
                            appear instantly and support partial matches for
                            faster lookup.
                            <div>
                              <img
                                src="assets/image/content/CallSearch.png"
                                className="mobile-step-img"
                                style={{ objectFit: "contain" }}
                                alt=""
                              />
                            </div>
                          </li>

                          <li data-target="4" className="cursor-pointer">
                            <strong>Adjust Page Length:</strong> Use the
                            <strong>Rows per Page</strong> dropdown (options:
                            10, 25, 50, 100) to control how many call records
                            are displayed on a single page.
                            <div>
                              <img
                                src="assets/image/content/docdrop.png"
                                className="mobile-step-img"
                                style={{ objectFit: "contain" }}
                                alt=""
                              />
                            </div>
                          </li>

                          <li data-target="5" className="cursor-pointer">
                            <strong>Sort Columns:</strong> Click on any column
                            header (such as <strong>Date</strong> or{" "}
                            <strong>Duration</strong> ) to sort the data in
                            ascending or descending order. An arrow icon will
                            indicate the current sort direction.
                            <div>
                              <img
                                src="assets/image/content/CallSid.png"
                                className="mobile-step-img"
                                style={{ objectFit: "contain" }}
                                alt=""
                              />
                            </div>
                          </li>

                          <li data-target="6" className="cursor-pointer">
                            <strong>Play or Download Call Recordings:</strong>
                            In the <strong>Full Call</strong> column:
                            <div>
                              <img
                                src="assets/image/content/fullcall.png"
                                className="mobile-step-img"
                                style={{ objectFit: "contain" }}
                                alt=""
                              />
                            </div>
                            <ul className="lists">
                              <li className="cursor-pointer">
                                Click the <strong>Play</strong> button to listen
                                to a call recording directly.
                              </li>

                              <li className="cursor-pointer">
                                Click the <strong>Download</strong> icon to save
                                the recording for later use.
                              </li>
                            </ul>
                          </li>

                          <li>
                            <strong>Contact the Caller:</strong> In the{" "}
                            <strong>Contact</strong> column, you can reach out
                            to the caller using:
                            <ul className="lists">
                              <li data-target="7" className="cursor-pointer">
                                <strong>Email Icon:</strong> Opens your default
                                email client to send an email.
                                <div>
                                  <img
                                    src="assets/image/content/Gmail.png"
                                    className="mobile-step-img"
                                    style={{ objectFit: "contain" }}
                                    alt=""
                                  />
                                </div>
                              </li>
                              <li data-target="8" className="cursor-pointer">
                                <strong>WhatsApp Icon:</strong> Starts a
                                WhatsApp chat with the caller.
                                <div>
                                  <img
                                    src="assets/image/content/Whatsapp.png"
                                    className="mobile-step-img"
                                    style={{ objectFit: "contain" }}
                                    alt=""
                                  />
                                </div>
                              </li>
                              <li data-target="9" className="cursor-pointer">
                                <strong>Message Icon:</strong> Prompts a pop-up
                                to choose a messaging app from your system.
                                <div>
                                  <img
                                    src="assets/image/content/message.png"
                                    className="mobile-step-img"
                                    style={{ objectFit: "contain" }}
                                    alt=""
                                  />
                                </div>
                              </li>
                            </ul>
                          </li>

                          <li data-target="1" className="cursor-pointer">
                            <strong>Navigate Pages:</strong> Use the
                            <strong>pagination controls</strong> (First,
                            Previous, Next, Last) at the bottom-right to move
                            through pages. The summary at the bottom-left (e.g.,
                            “Showing 1 to 10 of 30 entries”) updates
                            automatically based on filters and page selection.
                            <div>
                              <img
                                src="assets/image/content/pagination.png"
                                className="mobile-step-img"
                                style={{ objectFit: "contain" }}
                                alt=""
                              />
                            </div>
                          </li>
                        </ul>
                      </div>

                      <div className="col-4">
                        <div className="stack">
                          <div>
                            <img
                              src="assets/image/content/pagination.png"
                              style={{ objectFit: "contain" }}
                              alt=""
                            />
                          </div>
                          <div>
                            <img
                              src="assets/image/content/dateRange.png"
                              style={{ objectFit: "contain" }}
                              alt=""
                            />
                          </div>
                          <div>
                            <img
                              src="assets/image/content/CallSearch.png"
                              style={{ objectFit: "contain" }}
                              alt=""
                            />
                          </div>
                          <div>
                            <img
                              src="assets/image/content/docdrop.png"
                              style={{ objectFit: "contain" }}
                              alt=""
                            />
                          </div>
                          <div>
                            <img
                              src="assets/image/content/CallSid.png"
                              style={{ objectFit: "contain" }}
                              alt=""
                            />
                          </div>
                          <div>
                            <img
                              src="assets/image/content/fullcall.png"
                              style={{ objectFit: "contain" }}
                              alt=""
                            />
                          </div>
                          <div>
                            <img
                              src="assets/image/content/Gmail.png"
                              style={{ objectFit: "contain" }}
                              alt=""
                            />
                          </div>
                          <div>
                            <img
                              src="assets/image/content/Whatsapp.png"
                              style={{ objectFit: "contain" }}
                              alt=""
                            />
                          </div>
                          <div>
                            <img
                              src="assets/image/content/message.png"
                              style={{ objectFit: "contain" }}
                              alt=""
                            />
                          </div>
                          <div>
                            <img
                              src="assets/image/content/incomingcall.png"
                              style={{ objectFit: "contain" }}
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="gx-block" id="reviews">
          <div className="gx-card gx-page-block">
            <div className="gx-card-header">
              <p className="second-main-title">Reviews</p>
              <div className="header-tools">
                <a href="#" className="gx-full-card">
                  <i className="ri-fullscreen-fill"></i>
                </a>
              </div>
            </div>

            <div className="gx-card-content">
              <div className="intero">
                <h1>Reviews</h1>
                <p className="popins-data-helpex">
                  The Reviews section provides a complete overview of patient
                  feedback, helping you assess overall service quality. It
                  displays average ratings collected from surveys, calls, and
                  WhatsApp polls, giving valuable insights into patient
                  satisfaction.
                </p>

                <p className="popins-data-helpex">
                  This section includes two main parts:
                </p>
                <p className="popins-data-helpex">
                  <strong>Survey Reviews</strong> and{" "}
                  <strong>Call Reviews</strong> where you can view detailed
                  feedback, comments, and individual ratings. Built-in search
                  and filter options make it easy to navigate and analyze
                  specific responses.
                </p>

                <h3 className="mt-4">Average Ratings:</h3>
                <ul className="lists">
                  <li>
                    <strong>Average Survey Rating</strong> → (e.g., 3/5)
                    Represents the average score from all submitted survey
                    responses.
                  </li>
                  <li>
                    <strong>Average Call Rating</strong> → (e.g., 3/5) Reflects
                    the overall rating based on patient feedback collected after
                    calls.{" "}
                  </li>
                  <li>
                    <strong>Average Needs Addressed Rating</strong> → (e.g.,
                    3/5) Shows the average rating gathered through WhatsApp
                    polls after a patient’s visit.
                  </li>
                </ul>
              </div>

              <div className="mt-5">
                <h4>Survey Reviews</h4>
                <ul className="nav nav-tabs mt-3" id="surveyTab" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link active"
                      id="survey-preview-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#survey-preview"
                      type="button"
                      role="tab"
                      aria-controls="survey-preview"
                      aria-selected="true"
                    >
                      <i className="ri-eye-line"></i> Preview
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="survey-usage-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#survey-usage"
                      type="button"
                      role="tab"
                      aria-controls="survey-usage"
                      aria-selected="false"
                    >
                      <span className="material-symbols-outlined">build</span>{" "}
                      Usage
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="survey-howto-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#survey-howto"
                      type="button"
                      role="tab"
                      aria-controls="survey-howto"
                      aria-selected="false"
                    >
                      <span className="material-symbols-outlined">
                        menu_book
                      </span>{" "}
                      How to Use
                    </button>
                  </li>
                </ul>

                <div
                  className="tab-content second-content"
                  id="surveyTabContent"
                >
                  <div
                    className="tab-pane fade show active"
                    id="survey-preview"
                    role="tabpanel"
                    aria-labelledby="survey-preview-tab"
                  >
                    <img
                      src="./assets/image/content/reviews-img.png"
                      alt="Survey Reviews preview not found"
                    />
                  </div>

                  <div
                    className="tab-pane fade"
                    id="survey-usage"
                    role="tabpanel"
                    aria-labelledby="survey-usage-tab"
                  >
                    <p>
                      <strong>What it is:</strong>
                    </p>
                    <p>
                      The Survey Reviews section provides a detailed view of
                      patient feedback collected through surveys. It helps
                      assess satisfaction levels, call quality, and how well
                      patient needs were addressed.
                    </p>

                    <p>
                      <strong>Description:</strong>
                    </p>
                    <p>
                      Displays Appointment Serial Number (#), Appointment ID,
                      Patient Name, Patient Phone Number, and other relevant
                      details along with corresponding feedback and ratings. It
                      also shows the poll caption, time when the poll was sent,
                      and the user’s response time (if no response is received,
                      it is displayed as N/A).{" "}
                    </p>
                    <ul className="lists">
                      <li>
                        <strong>Search bar:</strong> Quickly find specific
                        survey entries by keyword.
                      </li>
                      <li>
                        <strong>Filter:</strong> Select how many reviews to
                        display per page.
                      </li>
                      <li>
                        <strong>Pagination:</strong> Navigate between pages and
                        view the total number of displayed survey entries.
                      </li>
                    </ul>
                  </div>

                  <div
                    className="tab-pane fade how-to-use"
                    id="survey-howto"
                    role="tabpanel"
                    aria-labelledby="survey-howto-tab"
                  >
                    <div className="d-md-flex justify-content-md-between col-md-10 col-11  ">
                      <div className="col-12 col-md-11 col-lg-7  ">
                        <p>
                          <strong>How to Use:</strong>
                        </p>

                        <ul className="steps lists">
                          <li data-target="9" className="cursor-pointer">
                            Open the <strong>Survey Reviews</strong> tab to view
                            all submitted survey responses.
                            <div>
                              <img
                                src="assets/image/content/review.png"
                                className="mobile-step-img"
                                style={{ objectFit: "contain" }}
                                alt=""
                              />
                            </div>
                          </li>
                          <li className="cursor-pointer">
                            Scroll through the list to explore individual
                            feedback entries.
                          </li>
                          <li data-target="2" className="cursor-pointer">
                            Review the <strong>ratings</strong> under the Review
                            header for detailed patient insights and
                            experiences.
                            <div>
                              <img
                                src="assets/image/content/reviewbox.png"
                                className="mobile-step-img"
                                style={{ objectFit: "contain" }}
                                alt=""
                              />
                            </div>
                          </li>
                          <li data-target="8" className="cursor-pointer">
                            View the <strong>Caption</strong> to find the poll
                            message against which review is submitted.
                            <div>
                              <img
                                src="assets/image/content/review-caption.PNG"
                                className="mobile-step-img"
                                style={{ objectFit: "contain" }}
                                alt=""
                              />
                            </div>
                          </li>
                          <li data-target="3" className="cursor-pointer">
                            Check the <strong>Created At</strong> column to see
                            when the review was sent.
                            <div>
                              <img
                                src="assets/image/content/created.png"
                                className="mobile-step-img"
                                style={{ objectFit: "contain" }}
                                alt=""
                              />
                            </div>
                          </li>
                          <li data-target="4" className="cursor-pointer">
                            View the <strong>Updated At</strong> column to know
                            the last time the review was responded.
                            <div>
                              <img
                                src="assets/image/content/updated.png"
                                className="mobile-step-img"
                                style={{ objectFit: "contain" }}
                                alt=""
                              />
                            </div>
                          </li>
                          <li data-target="5" className="cursor-pointer">
                            Use the <strong>search bar</strong> to quickly find
                            a survey by patient name, date, or keyword.
                            <div>
                              <img
                                src="assets/image/content/Search Review.png"
                                className="mobile-step-img"
                                style={{ objectFit: "contain" }}
                                alt=""
                              />
                            </div>
                          </li>
                          <li data-target="6" className="cursor-pointer">
                            Apply <strong>filters</strong> to adjust how many
                            reviews are displayed per page.
                            <div>
                              <img
                                src="assets/image/content/docdrop.png"
                                className="mobile-step-img"
                                style={{ objectFit: "contain" }}
                                alt=""
                              />
                            </div>
                          </li>
                          <li data-target="7" className="cursor-pointer">
                            <strong>Sort columns</strong> by clicking the column
                            headers to arrange entries in ascending or
                            descending order.
                            <div>
                              <img
                                src="assets/image/content/review-9.PNG"
                                className="mobile-step-img"
                                style={{ objectFit: "contain" }}
                                alt=""
                              />
                            </div>
                          </li>
                          <li data-target="1" className="cursor-pointer">
                            Use the <strong>pagination controls</strong> to
                            navigate through pages of survey entries.
                            <div>
                              <img
                                src="assets/image/content/pagination.png"
                                className="mobile-step-img"
                                style={{ objectFit: "contain" }}
                                alt=""
                              />
                            </div>
                          </li>
                        </ul>
                      </div>

                      <div className="col-4">
                        <div className="stack">
                          <div>
                            <img
                              src="assets/image/content/pagination.png"
                              alt=""
                              style={{ objectFit: "contain" }}
                            />
                          </div>
                          <div>
                            <img
                              src="assets/image/content/reviewbox.png"
                              style={{ objectFit: "contain" }}
                              alt=""
                            />
                          </div>
                          <div>
                            <img
                              src="assets/image/content/created.png"
                              style={{ objectFit: "contain" }}
                              alt=""
                            />
                          </div>
                          <div>
                            <img
                              src="assets/image/content/updated.png"
                              style={{ objectFit: "contain" }}
                              alt=""
                            />
                          </div>
                          <div>
                            <img
                              src="assets/image/content/Search Review.png"
                              style={{ objectFit: "contain" }}
                              alt=""
                            />
                          </div>
                          <div>
                            <img
                              src="assets/image/content/docdrop.png"
                              style={{ objectFit: "contain" }}
                              alt=""
                            />
                          </div>
                          <div>
                            <img
                              src="assets/image/content/report-6.PNG"
                              style={{ objectFit: "contain" }}
                              alt=""
                            />
                          </div>
                          <div>
                            <img
                              src="assets/image/content/review-caption.PNG"
                              style={{ objectFit: "contain" }}
                              alt=""
                            />
                          </div>
                          <div>
                            <img
                              src="assets/image/content/review.png"
                              style={{ objectFit: "contain" }}
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-5">
                <h4>Call Reviews</h4>
                <ul className="nav nav-tabs mt-3" id="callTab" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link active"
                      id="call-preview-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#call-preview"
                      type="button"
                      role="tab"
                      aria-controls="call-preview"
                      aria-selected="true"
                    >
                      <i className="ri-eye-line"></i> Preview
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="call-usage-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#call-usage"
                      type="button"
                      role="tab"
                      aria-controls="call-usage"
                      aria-selected="false"
                    >
                      <span className="material-symbols-outlined">build</span>{" "}
                      Usage
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="call-howto-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#call-howto"
                      type="button"
                      role="tab"
                      aria-controls="call-howto"
                      aria-selected="false"
                    >
                      <span className="material-symbols-outlined">
                        menu_book
                      </span>{" "}
                      How to Use
                    </button>
                  </li>
                </ul>

                <div className="tab-content second-content" id="callTabContent">
                  <div
                    className="tab-pane fade show active"
                    id="call-preview"
                    role="tabpanel"
                    aria-labelledby="call-preview-tab"
                  >
                    <img
                      src="./assets/image/content/call-reviews-img.png"
                      alt="Call Reviews preview not found"
                    />
                  </div>

                  <div
                    className="tab-pane fade"
                    id="call-usage"
                    role="tabpanel"
                    aria-labelledby="call-usage-tab"
                  >
                    <p>
                      <strong>What it is:</strong>
                    </p>
                    <p>
                      The <strong>Call Reviews</strong> section provides
                      detailed feedback on phone interactions, including ratings
                      and comments. It helps assess communication quality and
                      monitor staff performance based on patient feedback.
                    </p>

                    <p>
                      <strong>Description:</strong>
                    </p>
                    <ul className="lists">
                      <li>
                        Displays <strong>Serial Number (#)</strong>,{" "}
                        <strong>Phone Number</strong>,{" "}
                        <strong>Call Quality Rating</strong>,{" "}
                        <strong>Needs Addressed Rating</strong>, and
                        <strong>Contact options</strong> (WhatsApp or Message)
                        for additional context.
                      </li>
                      <li>
                        Shows complete <strong>caller information</strong> for
                        easy reference.
                      </li>
                      <li>
                        <strong>Search bar:</strong> quickly locate reviews for
                        a specific caller.
                      </li>
                      <li>
                        <strong>Pagination:</strong> indicates how many call
                        reviews are currently visible on the screen.
                      </li>
                    </ul>
                  </div>

                  <div
                    className="tab-pane fade how-to-use"
                    id="call-howto"
                    role="tabpanel"
                    aria-labelledby="call-howto-tab"
                  >
                    <div className="d-md-flex justify-content-md-between col-md-10 col-11  ">
                      <div className="col-12 col-md-11 col-lg-7  ">
                        <p>
                          <strong>How to Use:</strong>
                        </p>
                        <ul className=" lists steps">
                          <li data-target="10" className="cursor-pointer">
                            Open the <strong>Call Reviews</strong> tab to view
                            all recorded call feedback.
                            <img
                              src="assets/image/content/callrev.png"
                              className="mobile-step-img"
                              style={{ objectFit: "contain" }}
                              alt=""
                            />
                          </li>
                          <li className="cursor-pointer">
                            Scroll through the list to explore individual call
                            review entries.
                          </li>
                          <li data-target="2" className="cursor-pointer">
                            Check the <strong>Serial Number (#)</strong> to
                            identify each call’s position in the list.
                            <div>
                              <img
                                src="assets/image/content/serial.png"
                                className="mobile-step-img"
                                style={{ objectFit: "contain" }}
                                alt=""
                              />
                            </div>
                          </li>

                          <li data-target="3" className="cursor-pointer">
                            Review the Phone Number of the caller.
                            <div>
                              <img
                                src="assets/image/content/num-tonum.PNG"
                                className="mobile-step-img"
                                style={{ objectFit: "contain" }}
                                alt=""
                              />
                            </div>
                          </li>

                          <li data-target="5" className="cursor-pointer">
                            View the <strong>Call Quality Rating</strong> to
                            assess communication performance.
                            <div>
                              <img
                                src="assets/image/content/CallQuality.png"
                                className="mobile-step-img"
                                style={{ objectFit: "contain" }}
                                alt=""
                              />
                            </div>
                          </li>
                          <li data-target="6" className="cursor-pointer">
                            {" "}
                            Check the <strong>Needs Addressed Rating</strong>
                            to evaluate how effectively patient needs were
                            handled.
                            <div>
                              <img
                                src="assets/image/content/NeedsAdressed.png"
                                className="mobile-step-img"
                                style={{ objectFit: "contain" }}
                                alt=""
                              />
                            </div>
                          </li>
                          <li data-target="7" className="cursor-pointer">
                            Click <strong>Contact</strong> to reach out patients
                            via WhatsApp, or any other supported messaging app.
                            <div>
                              <img
                                src="assets/image/content/contact.png"
                                className="mobile-step-img"
                                style={{ objectFit: "contain" }}
                                alt=""
                              />
                            </div>
                          </li>
                          <li data-target="8" className="cursor-pointer">
                            Click on column headers (e.g.,{" "}
                            <strong>Call SID</strong>,{" "}
                            <strong>Phone Number</strong>,{" "}
                            <strong>Call Quality Rating</strong>,
                            <strong>Needs Addressed Rating</strong>,{" "}
                            <strong>Contact</strong> ) to{" "}
                            <strong>sort data</strong> in ascending or
                            descending order.
                            <div>
                              <img
                                src="assets/image/content/CallSid.png"
                                className="mobile-step-img"
                                style={{ objectFit: "contain" }}
                                alt=""
                              />
                            </div>
                          </li>
                          <li data-target="9" className="cursor-pointer">
                            Use the <strong>Search bar</strong> to quickly find
                            a specific call review by <strong>SID</strong> or{" "}
                            <strong>Caller Number</strong>.
                            <div>
                              <img
                                src="assets/image/content/Search Review.png"
                                className="mobile-step-img"
                                style={{ objectFit: "contain" }}
                                alt=""
                              />
                            </div>
                          </li>
                          <li data-target="1" className="cursor-pointer">
                            Navigate between pages using{" "}
                            <strong>pagination controls</strong> (left and right
                            arrows) at the bottom of the table.
                            <div>
                              <img
                                src="assets/image/content/pagination.png"
                                className="mobile-step-img"
                                style={{ objectFit: "contain" }}
                                alt=""
                              />
                            </div>
                          </li>
                        </ul>
                      </div>

                      <div className="col-4">
                        <div className="stack">
                          <div>
                            <img
                              src="assets/image/content/pagination.png"
                              alt=""
                              style={{ objectFit: "contain" }}
                            />
                          </div>
                          <div>
                            <img
                              src="assets/image/content/serial.png"
                              alt=""
                              style={{ objectFit: "contain" }}
                            />
                          </div>

                          <div>
                            <img
                              src="assets/image/content/num-tonum.PNG"
                              style={{ objectFit: "contain" }}
                              alt=""
                            />
                          </div>
                          <div>
                            <img
                              src="assets/image/content/toPhone.png"
                              style={{ objectFit: "contain" }}
                              alt=""
                            />
                          </div>
                          <div>
                            <img
                              src="assets/image/content/CallQuality.png"
                              style={{ objectFit: "contain" }}
                              alt=""
                            />
                          </div>
                          <div>
                            <img
                              src="assets/image/content/NeedsAdressed.png"
                              style={{ objectFit: "contain" }}
                              alt=""
                            />
                          </div>
                          <div>
                            <img
                              src="assets/image/content/contact.png"
                              alt=""
                              style={{ objectFit: "contain" }}
                            />
                          </div>
                          <div>
                            <img
                              src="assets/image/content/CallSid.png"
                              style={{ objectFit: "contain" }}
                              alt=""
                            />
                          </div>
                          <div>
                            <img
                              src="assets/image/content/Search Review.png"
                              style={{ objectFit: "contain" }}
                              alt=""
                            />
                          </div>
                          <div>
                            <img
                              src="assets/image/content/callrev.png"
                              style={{ objectFit: "contain" }}
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="gx-block" id="file_report">
          <div className="gx-card gx-page-block">
            <div className="gx-card-header">
              <p className="second-main-title">Reports</p>
              <div className="header-tools">
                <a href="#" className="gx-full-card">
                  <i className="ri-fullscreen-fill"></i>
                </a>
              </div>
            </div>
            {/*FIXED: gx-card-content is now inside gx-card gx-page-block */}
            <div className="gx-card-content">
              <div className="intero">
                <h1>Reports</h1>
                <p className="popins-data-helpex">
                  The <strong>Reports</strong> section offers a comprehensive
                  summary of all appointments and call activities. It enables
                  you to track total numbers, monitor weekly performance trends,
                  measure system response rates, and review completed
                  appointments in detail. With advanced filters, such as search,
                  date range, department, and doctor selection, you can easily
                  narrow down specific data. Additionally, reports can be
                  exported for further analysis or record-keeping.
                </p>

                <h3 className="mt-4 mb-2">Appointments Info</h3>
                <ul className="lists">
                  <li>
                    <strong>Total Appointments:</strong> Displays the total
                    number of appointments with a weekly breakdown, including
                    percentage trends showing increases or decreases compared to
                    the previous week.
                  </li>
                  <li>
                    <strong>Call Statistics:</strong> Shows total calls versus
                    received calls, along with the system’s overall response
                    rate.
                  </li>
                  <li>
                    <strong>Completed Bookings:</strong> Indicates the number of
                    confirmed appointments, supported by a weekly comparison and
                    trend analysis.
                  </li>
                </ul>

                <ul
                  className="nav nav-tabs mt-4"
                  id="reportsTab"
                  role="tablist"
                >
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link active"
                      id="reports-preview-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#reports-preview"
                      type="button"
                      role="tab"
                      aria-controls="reports-preview"
                      aria-selected="true"
                    >
                      <i className="ri-eye-line"></i> Preview
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="reports-usage-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#reports-usage"
                      type="button"
                      role="tab"
                      aria-controls="reports-usage"
                      aria-selected="false"
                    >
                      <span className="material-symbols-outlined">build</span>{" "}
                      Usage
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="reports-howto-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#reports-howto"
                      type="button"
                      role="tab"
                      aria-controls="reports-howto"
                      aria-selected="false"
                    >
                      <span className="material-symbols-outlined">
                        menu_book
                      </span>{" "}
                      How to Use
                    </button>
                  </li>
                </ul>
              </div>
              <div
                className="tab-content second-content"
                id="reportsTabContent"
              >
                <div
                  className="tab-pane fade show active"
                  id="reports-preview"
                  role="tabpanel"
                  aria-labelledby="reports-preview-tab"
                >
                  <img
                    src="./assets/image/content/report-img.png"
                    alt="Reports preview not found"
                  />
                </div>

                <div
                  className="tab-pane fade"
                  id="reports-usage"
                  role="tabpanel"
                  aria-labelledby="reports-usage-tab"
                >
                  <p>
                    <strong>What it is:</strong>
                  </p>
                  <p>
                    The Reports section provides a detailed overview of all
                    appointments and related activities. It allows you to
                    efficiently track patient information, apply filters,
                    perform searches, and export customized reports as needed.
                  </p>

                  <p>
                    <strong>Description:</strong>
                  </p>
                  <p>
                    Displays{" "}
                    <strong>
                      Serial Number (#), Appointment ID, Patient Name, Email,
                      Phone Number, Appointment Date & Time, Doctor, Department,
                      Status, Call Info,
                    </strong>{" "}
                    and <strong>Contact</strong> options for easy reference.
                  </p>
                  <ul className="lists">
                    <li>
                      <strong>Filters:</strong> Three filters (
                      <strong>Date Range, Doctor,</strong> and
                      <strong>Department</strong> ) help refine your search
                      results.
                    </li>
                    <li>
                      <strong>Apply Button:</strong> Applies the selected
                      filters to update and display relevant data.
                    </li>
                    <li>
                      <strong>Search Bar:</strong> Quickly find reports by
                      patient name, phone number, or email.
                    </li>
                    <li>
                      <strong>Sort Option:</strong> Click on column headers
                      (e.g., Appointment Date, Doctor, Status) to sort data in
                      ascending or descending order.
                    </li>
                    <li>
                      <strong>Export Button:</strong> Downloads reports in .xls
                      format within an encrypted ZIP folder. A password is
                      provided to unlock it, valid only for same day’s file.
                      <ul className="lists">
                        <li>
                          If any filters are applied,{" "}
                          <strong>only the filtered data is exported.</strong>
                        </li>
                        <li>
                          If no filters are active,{" "}
                          <strong>the complete dataset is exported.</strong>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <strong>Contact Options:</strong> Use icons to reach
                      patients via WhatsApp, Gmail, or any other messaging app
                      available on your system.
                    </li>
                    <li>
                      <strong>Pagination:</strong> View how many reports are
                      displayed per page, navigate between pages, and adjust the
                      number of records shown using the pagination controls.
                    </li>
                  </ul>
                </div>

                <div
                  className="tab-pane fade how-to-use"
                  id="reports-howto"
                  role="tabpanel"
                  aria-labelledby="reports-howto-tab"
                >
                  <div className="d-md-flex justify-content-md-between col-md-10 col-11  ">
                    <div className="col-12 col-md-11 col-lg-7  ">
                      <p>
                        <strong>How to Use:</strong>
                      </p>
                      <ul className="lists steps">
                        <li data-target="13" className="cursor-pointer">
                          Open the <strong>Reports</strong> tab to view all
                          appointment records.
                          <div>
                            <img
                              src="assets/image/content/report.png"
                              className="mobile-step-img"
                              style={{ objectFit: "contain" }}
                              alt=""
                            />
                          </div>
                        </li>
                        <li data-target="2" className="cursor-pointer">
                          Use the <strong>Search Bar</strong> to find a specific
                          patient by name, email, or phone number.
                          <div>
                            <img
                              src="assets/image/content/SearchAppoint.png"
                              className="mobile-step-img"
                              style={{ objectFit: "contain" }}
                              alt=""
                            />
                          </div>
                        </li>
                        <li data-target="3" className="cursor-pointer">
                          Select filters such as <strong>Date Range</strong>,
                          <strong>Doctor</strong>, and{" "}
                          <strong>Department</strong> (individually or
                          together).
                          <div>
                            <img
                              src="assets/image/content/Date Range.png"
                              className="mobile-step-img"
                              style={{ objectFit: "contain" }}
                              alt=""
                            />
                          </div>
                        </li>
                        <li data-target="4" className="cursor-pointer">
                          Click the <strong>Apply</strong> button to refine and
                          display the filtered results.
                          <div>
                            <img
                              src="assets/image/content/Apply.png"
                              className="mobile-step-img"
                              style={{ objectFit: "contain" }}
                              alt=""
                            />
                          </div>
                        </li>
                        <li data-target="5" className="cursor-pointer">
                          To download reports, click the
                          <strong>Export</strong> button, once the report is
                          downloaded, you’ll receive a<strong>password</strong>.
                          Copy this password,{" "}
                          <strong>extract the ZIP file</strong>, and{" "}
                          <strong>enter the password</strong> to decrypt and
                          access the exported report.
                          <div>
                            <img
                              src="assets/image/content/Export.png"
                              className="mobile-step-img"
                              style={{ objectFit: "contain" }}
                              alt=""
                            />
                          </div>
                        </li>
                        <li data-target="6" className="cursor-pointer">
                          Review key details such as{" "}
                          <strong>
                            Serial Number (#), Appointment ID, Patient Name,
                            Email, Phone Number,Appointment Date & Time,
                            Doctor,Department,
                          </strong>{" "}
                          and <strong>Status</strong> (Confirmed, Completed, or
                          Canceled).
                          <div>
                            <img
                              src="assets/image/content/report-6.PNG"
                              className="mobile-step-img"
                              style={{ objectFit: "contain" }}
                              alt=""
                            />
                          </div>
                        </li>
                        {/*<li data-target="7" className="cursor-pointer">View <strong>Patient Name</strong>, <strong>Email</strong>, and <strong>Phone Number</strong>.
                  <div>
                <img src="assets/image/content/RepDetails.png" className="mobile-step-img" style={{"objectFit": "contain"}} alt="" />   
                 </div>       
                </li>
                <li data-target="8" className="cursor-pointer">Check <strong>Appointment Date & Time</strong>, <strong>Doctor</strong>, and <strong>Department</strong> info.
                   <div>
                <img src="assets/image/content/ReviewDet.png" className="mobile-step-img" style={{"objectFit": "contain"}} alt="" />       
                </div>
                </li>
                <li data-target="9" className="cursor-pointer">See the <strong>Status</strong> (e.g., Scheduled, Completed, etc.).
                   <div>
                <img src="assets/image/content/revStatus.png" className="mobile-step-img" style={{"objectFit": "contain"}} alt="" /> 
                </div>         
                </li> */}
                        <li data-target="10" className="cursor-pointer">
                          Check <strong>Full Call</strong> Info if available for
                          communication records.
                          <div>
                            <img
                              src="assets/image/content/fullcall.png"
                              className="mobile-step-img"
                              style={{ objectFit: "contain" }}
                              alt=""
                            />
                          </div>
                        </li>
                        <li data-target="11" className="cursor-pointer">
                          Use <strong>Contact Icons</strong> (WhatsApp, Email,
                          Message) to reach out to patients directly.
                          <div>
                            <img
                              src="assets/image/content/RevContact.png"
                              className="mobile-step-img"
                              style={{ objectFit: "contain" }}
                              alt=""
                            />
                          </div>
                        </li>
                        <li data-target="12" className="cursor-pointer">
                          Click on <strong>column headers</strong> (Patient
                          Name, Phone, Date, Doctor, Department) to{" "}
                          <strong>sort records</strong> in ascending or
                          descending order.
                          <div>
                            <img
                              src="assets/image/content/RevOrder.png"
                              className="mobile-step-img"
                              style={{ objectFit: "contain" }}
                              alt=""
                            />
                          </div>
                        </li>
                        <li data-target="1" className="cursor-pointer">
                          Navigate through report pages using
                          <strong>Pagination Controls</strong> (left/right
                          arrows) or adjust how many records are displayed per
                          page for easier management.
                          <div>
                            <img
                              src="assets/image/content/pagination.png"
                              className="mobile-step-img"
                              style={{ objectFit: "contain" }}
                              alt=""
                            />
                          </div>
                        </li>
                      </ul>
                    </div>
                    <div className="col-4">
                      <div className="stack">
                        <div>
                          <img
                            src="assets/image/content/pagination.png"
                            style={{ objectFit: "contain" }}
                            alt=""
                          />
                        </div>
                        <div>
                          <img
                            src="assets/image/content/SearchAppoint.png"
                            style={{ objectFit: "contain" }}
                            alt=""
                          />
                        </div>
                        <div>
                          <img
                            src="assets/image/content/Date Range.png"
                            style={{ objectFit: "contain" }}
                            alt=""
                          />
                        </div>
                        <div>
                          <img
                            src="assets/image/content/Apply.png"
                            style={{ objectFit: "contain" }}
                            alt=""
                          />
                        </div>
                        <div>
                          <img
                            src="assets/image/content/Export.png"
                            style={{ objectFit: "contain" }}
                            alt=""
                          />
                        </div>
                        <div>
                          <img
                            src="assets/image/content/report-6.PNG"
                            style={{ objectFit: "contain" }}
                            alt=""
                          />
                        </div>
                        <div>
                          <img
                            src="assets/image/content/RepDetails.png"
                            style={{ objectFit: "contain" }}
                            alt=""
                          />
                        </div>
                        <div>
                          <img
                            src="assets/image/content/ReviewDet.png"
                            style={{ objectFit: "contain" }}
                            alt=""
                          />
                        </div>
                        <div>
                          <img
                            src="assets/image/content/revStatus.png"
                            style={{ objectFit: "contain" }}
                            alt=""
                          />
                        </div>
                        <div>
                          <img
                            src="assets/image/content/RevFullCall.png"
                            style={{ objectFit: "contain" }}
                            alt=""
                          />
                        </div>
                        <div>
                          <img
                            src="assets/image/content/RevContact.png"
                            alt=""
                            style={{ objectFit: "contain" }}
                          />
                        </div>
                        <div>
                          <img
                            src="assets/image/content/RevOrder.png"
                            alt=""
                            style={{ objectFit: "contain" }}
                          />
                        </div>
                        <div>
                          <img
                            src="assets/image/content/report.png"
                            style={{ objectFit: "contain" }}
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>{" "}
              {/*end tab-content */}
            </div>{" "}
            {/*end gx-card-content */}
          </div>{" "}
          {/*end gx-card gx-page-block */}
        </div>{" "}
        {/*end gx-block */}
        {/*Doctor Management */}
        <div className="gx-block" id="file_docManage">
          <div className="gx-card gx-page-block">
            <div className="gx-card-header">
              <p className="second-main-title">Doctors Management</p>
              <div className="header-tools">
                <a href="#" className="gx-full-card">
                  <i className="ri-fullscreen-fill"></i>
                </a>
              </div>
            </div>
          </div>
          <div className="gx-card-content">
            <div className="intero">
              <h1>Doctor Management</h1>
              <p className="popins-data-helpex">
                The Doctor Management section allows you to efficiently organize
                hospital departments, manage doctor profiles, and monitor their
                availability. It is divided into three subsections (Departments,
                Doctors, and Doctor Leave) each designed to handle specific
                tasks such as department setup, doctor details, and leave
                scheduling with accuracy and ease.
              </p>

              <h4>Departments</h4>
              <ul className="nav nav-tabs mt-3" id="deptTab" role="tablist">
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link active"
                    id="preview-dept-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#preview-dept"
                    type="button"
                    role="tab"
                  >
                    {" "}
                    <i className="ri-eye-line"></i>
                    Preview
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="usage-dept-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#usage-dept"
                    type="button"
                    role="tab"
                  >
                    {" "}
                    <span className="material-symbols-outlined">
                      build
                    </span>{" "}
                    Usage
                  </button>
                </li>
                <li className="nav-item" role="presentation">
                  <button
                    className="nav-link"
                    id="howto-dept-tab"
                    data-bs-toggle="tab"
                    data-bs-target="#howto-dept"
                    type="button"
                    role="tab"
                  >
                    {" "}
                    <span className="material-symbols-outlined">
                      menu_book
                    </span>{" "}
                    How to Use
                  </button>
                </li>
              </ul>

              <div className="tab-content second-content" id="deptTabContent">
                <div
                  className="tab-pane fade show active"
                  id="preview-dept"
                  role="tabpanel"
                >
                  <img
                    src="./assets/image/content/department-img.png"
                    alt="not found"
                  />
                </div>
                {/*Departments Usage */}
                <div
                  className="tab-pane fade"
                  id="usage-dept"
                  role="tabpanel"
                  aria-labelledby="usage-dept-tab"
                >
                  <p>
                    <strong>What it is:</strong>
                  </p>
                  <p>
                    The Departments section provides a complete list of all
                    hospital departments. It enables you to view, search, add,
                    update, and delete department details such as the department
                    name and contact number, ensuring efficient management of
                    organizational structure.
                  </p>

                  <p>
                    <strong>Description:</strong>
                  </p>
                  <ul className="lists">
                    <li>
                      Displays <strong>Serial Number (#)</strong>,{" "}
                      <strong>Department Name</strong>,
                      <strong>Department Phone Number</strong>, and{" "}
                      <strong>Actions</strong> (Edit and Delete).
                    </li>
                    <li>
                      <strong>Search Bar:</strong> Quickly locate a department
                      by name or phone number.
                    </li>
                    <li>
                      <strong>Actions Menu:</strong> Edit or delete existing
                      department details.
                    </li>
                    <li>
                      <strong>Add Department Button:</strong> Create new
                      department entries when required.
                    </li>
                    <li>
                      <strong>Filter Option:</strong> Choose how many records to
                      display per page (e.g., 10, 25, 50).
                    </li>
                    <li>
                      <strong>Sorting:</strong> Click on column headers to sort
                      records in ascending or descending order.
                    </li>
                    <li>
                      <strong>Pagination Controls:</strong> Navigate through
                      department records efficiently.
                    </li>
                  </ul>
                </div>

                {/*Departments How to Use */}
                <div
                  className="tab-pane fade how-to-use"
                  id="howto-dept"
                  role="tabpanel"
                  aria-labelledby="howto-dept-tab"
                >
                  <div className="d-md-flex justify-content-md-between col-md-10 col-11  ">
                    <div className="col-12 col-md-11 col-lg-7  ">
                      <p>
                        <strong>How to Use:</strong>
                      </p>
                      <ul className="lists steps">
                        <li data-target="8" className="cursor-pointer">
                          Open the <strong>Departments</strong> tab to view the
                          complete department list.
                          <div>
                            <img
                              src="assets/image/content/dep.png"
                              className="mobile-step-img"
                              style={{ objectFit: "contain" }}
                              alt=""
                            />
                          </div>
                        </li>
                        <li data-target="2" className="cursor-pointer">
                          Use the <strong>Search Bar</strong> to check whether a
                          department already exists by name or phone number.
                          <div>
                            <img
                              src="assets/image/content/depSearch.png"
                              className="mobile-step-img"
                              style={{ objectFit: "contain" }}
                              alt=""
                            />
                          </div>
                        </li>
                        <li data-target="3" className="cursor-pointer">
                          Click the <strong>Filter Dropdown</strong> to select
                          how many records to display per page (e.g., 10, 25,
                          50).
                          <div>
                            <img
                              src="assets/image/content/docdrop.png"
                              className="mobile-step-img"
                              style={{ objectFit: "contain" }}
                              alt=""
                            />
                          </div>
                        </li>

                        <li data-target="7" className="cursor-pointer">
                          Click the <strong>Add Department</strong> button to
                          create a new entry by selecting a department from the
                          dropdown or enter it manually, add the contact number,
                          and save.
                          <div>
                            <img
                              src="assets/image/content/add-depart.PNG"
                              className="mobile-step-img"
                              style={{ objectFit: "contain" }}
                              alt=""
                            />
                          </div>
                        </li>

                        <li data-target="4" className="cursor-pointer">
                          Review the list of added departments, including
                          <strong>Serial Number (#)</strong>,{" "}
                          <strong>Department Name</strong>, and{" "}
                          <strong>Phone Number</strong>.
                          <div>
                            <img
                              src="assets/image/content/depdetails.png"
                              className="mobile-step-img"
                              style={{ objectFit: "contain" }}
                              alt=""
                            />
                          </div>
                        </li>
                        <li data-target="5" className="cursor-pointer">
                          To modify existing details, click the{" "}
                          <strong>Edit Icon</strong> under{" "}
                          <strong>Actions</strong>, select or update the
                          department name and phone number from the dropdowns,
                          then click <strong>Update</strong>.
                          <div>
                            <img
                              src="assets/image/content/action.png"
                              className="mobile-step-img"
                              style={{ objectFit: "contain" }}
                              alt=""
                            />
                          </div>
                        </li>
                        <li data-target="5" className="cursor-pointer">
                          To delete a department, click the{" "}
                          <strong>Trash Icon</strong> under{" "}
                          <strong>Actions</strong> and confirm deletion by
                          clicking
                          <strong>Delete</strong> in the confirmation dialog
                          box.
                          <div>
                            <img
                              src="assets/image/content/delAction.png"
                              className="mobile-step-img"
                              style={{ objectFit: "contain" }}
                              alt=""
                            />
                          </div>
                        </li>
                        {/*<li data-target="6" className="cursor-pointer">Click the <strong>Add Department button</strong> to add a new department and enter details.
           <div>
        <img src="assets/image/content/depbutton.png" className="mobile-step-img" style={{"objectFit": "contain"}} alt="" />    
         </div>      
        </li> */}
                        <li data-target="1" className="cursor-pointer">
                          Use <strong>Pagination Controls</strong> to navigate
                          between pages or adjust how many records are displayed
                          per page.
                          <div>
                            <img
                              src="assets/image/content/pagination.png"
                              className="mobile-step-img"
                              style={{ objectFit: "contain" }}
                              alt=""
                            />
                          </div>
                        </li>
                      </ul>
                    </div>

                    <div className="col-4">
                      <div className="stack ">
                        <div>
                          <img
                            src="assets/image/content/pagination.png"
                            alt=""
                            style={{ objectFit: "contain" }}
                          />
                        </div>
                        <div>
                          <img
                            src="assets/image/content/depSearch.png"
                            style={{ objectFit: "contain" }}
                            alt=""
                          />
                        </div>
                        <div>
                          <img
                            src="assets/image/content/docdrop.png"
                            style={{ objectFit: "contain" }}
                            alt=""
                          />
                        </div>
                        <div>
                          <img
                            src="assets/image/content/depdetails.png"
                            style={{ objectFit: "contain" }}
                            alt=""
                          />
                        </div>
                        <div>
                          <img src="assets/image/content/action.png" alt="" />
                        </div>
                        <div>
                          <img
                            src="assets/image/content/depbutton.png"
                            style={{ objectFit: "contain" }}
                            alt=""
                          />
                        </div>
                        <div>
                          <img
                            src="assets/image/content/add-depart.PNG"
                            style={{ objectFit: "contain" }}
                            alt=""
                          />
                        </div>
                        <div>
                          <img
                            src="assets/image/content/dep.png"
                            style={{ objectFit: "contain" }}
                            alt=""
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <h4 className="mt-5">Doctors</h4>
                <ul
                  className="nav nav-tabs mt-3"
                  id="doctorListTab"
                  role="tablist"
                >
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link active"
                      id="preview-doclist-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#preview-doclist"
                      type="button"
                      role="tab"
                    >
                      {" "}
                      <i className="ri-eye-line"></i>
                      Preview
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="usage-doclist-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#usage-doclist"
                      type="button"
                      role="tab"
                    >
                      {" "}
                      <span className="material-symbols-outlined">
                        build
                      </span>{" "}
                      Usage
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="howto-doclist-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#howto-doclist"
                      type="button"
                      role="tab"
                    >
                      {" "}
                      <span className="material-symbols-outlined">
                        menu_book
                      </span>{" "}
                      How to Use
                    </button>
                  </li>
                </ul>

                <div
                  className="tab-content second-content"
                  id="doctorListTabContent"
                >
                  <div
                    className="tab-pane fade show active"
                    id="preview-doclist"
                    role="tabpanel"
                  >
                    <img
                      src="./assets/image/content/doctors-img.png"
                      alt="not found"
                    />
                  </div>
                  {/*Doctors Usage */}
                  <div
                    className="tab-pane fade"
                    id="usage-doclist"
                    role="tabpanel"
                    aria-labelledby="usage-doclist-tab"
                  >
                    <p>
                      <strong>What it is:</strong>
                    </p>
                    <p>
                      The Doctors section provides a comprehensive list of all
                      doctors within the hospital and allows the addition of new
                      doctors in the system. It displays key information such as
                      their department, contact details, spoken languages, and
                      gender, allowing staff to manage and locate doctors
                      efficiently.
                    </p>

                    <p>
                      <strong>Description:</strong>
                    </p>
                    <ul className="lists">
                      <li>
                        Includes{" "}
                        <strong>
                          Serial Number (#), Doctor Name, Phone Number,
                          Department, Languages, Gender,
                        </strong>{" "}
                        and <strong>Actions</strong>.
                      </li>
                      <li>
                        <strong>Actions:</strong> Add Doctor, Update or Delete
                        doctor records as needed.
                      </li>
                      <li>
                        <strong>Search Bar:</strong> Quickly locate a doctor by
                        name or phone number.
                      </li>
                      <li>
                        <strong>Filter Option:</strong> Choose how many records
                        to display per page (e.g., 10, 25, 50).
                      </li>
                      <li>
                        <strong>Sorting:</strong> Click on column headers (e.g.,
                        Name, Department, Gender) to sort records in ascending
                        or descending order.
                      </li>
                      <li>
                        <strong>Pagination:</strong> Navigate through multiple
                        doctor entries or adjust how many records appear per
                        page.
                      </li>
                    </ul>
                  </div>

                  {/*Doctors How to Use */}
                  <div
                    className="tab-pane fade how-to-use"
                    id="howto-doclist"
                    role="tabpanel"
                    aria-labelledby="howto-doclist-tab"
                  >
                    <div className="d-md-flex justify-content-md-between col-md-10 col-11  ">
                      <div className="col-12 col-md-11 col-lg-7  ">
                        <p>
                          <strong>How to Use:</strong>
                        </p>
                        <ul className="lists steps">
                          <li data-target="15" className="cursor-pointer">
                            Open the <strong>Doctors</strong> tab to view the
                            complete doctor list.
                            <div>
                              <img
                                src="assets/image/content/doc.png"
                                className="mobile-step-img"
                                style={{ objectFit: "contain" }}
                              />
                            </div>
                          </li>
                          <li data-target="2" className="cursor-pointer">
                            Use the <strong>Search Bar</strong> to find doctors
                            by name, phone number, or department.
                            <div>
                              <img
                                src="assets/image/content/docSearch.png"
                                className="mobile-step-img"
                                style={{ objectFit: "contain" }}
                              />
                            </div>
                          </li>
                          <li data-target="3" className="cursor-pointer">
                            Click the <strong>Filter Dropdown</strong> to choose
                            how many entries (e.g., 10, 25, 50) you want to
                            display per page.
                            <div>
                              <img
                                src="assets/image/content/docdrop.png"
                                className="mobile-step-img"
                                style={{ objectFit: "contain" }}
                              />
                            </div>
                          </li>
                          <li data-target="4" className="cursor-pointer">
                            Review the list showing{" "}
                            <strong>
                              Serial Number (#), Doctor Name, Phone Number,
                              Department, Languages,
                            </strong>{" "}
                            and <strong>Gender</strong>.
                            <div>
                              <img
                                src="assets/image/content/docdetails.png"
                                className="mobile-step-img"
                                style={{ objectFit: "contain" }}
                              />
                            </div>
                          </li>
                          <li data-target="5" className="cursor-pointer">
                            Click the <strong>Edit Icon</strong> under Actions
                            to update doctor details such as department, phone
                            number, or language, available days, timings, then
                            click <strong>Update</strong>.
                            <div>
                              <img
                                src="assets/image/content/action.png"
                                className="mobile-step-img"
                                style={{ objectFit: "contain" }}
                              />
                            </div>
                          </li>
                          <li data-target="6" className="cursor-pointer">
                            Click the <strong>Delete Icon</strong> under Actions
                            to remove outdated records. Confirm the action in
                            the dialogue box.
                            <div>
                              <img
                                src="assets/image/content/delAction.png"
                                className="mobile-step-img"
                                style={{ objectFit: "contain" }}
                              />
                            </div>
                          </li>
                          <li data-target="1" className="cursor-pointer">
                            Use <strong>Pagination Controls</strong> to move
                            between pages of doctor entries.
                            <div>
                              <img
                                src="assets/image/content/pagination.png"
                                className="mobile-step-img"
                                style={{ objectFit: "contain" }}
                              />
                            </div>
                          </li>
                        </ul>

                        <p style={{ marginTop: "10px" }}>
                          <strong>Add New Doctor:</strong>
                        </p>
                        <ul className="lists steps">
                          <li data-target="7" className="cursor-pointer">
                            Click the <strong>Add Doctor</strong> button to open
                            the Doctor Information form.
                            <div>
                              <img
                                src="assets/image/content/add-doctor-btn.PNG"
                                className="mobile-step-img"
                                style={{ objectFit: "contain" }}
                              />
                            </div>
                          </li>
                          <li data-target="8" className="cursor-pointer">
                            Fill in all required fields including
                            <strong>
                              Doctor Name, Phone Number, Gender, Doctor Color,
                              Department,
                            </strong>{" "}
                            and
                            <strong>Language</strong>.
                            <div>
                              <img
                                src="assets/image/content/doc-num-lang.PNG"
                                className="mobile-step-img"
                                style={{ objectFit: "contain" }}
                              />
                            </div>
                          </li>
                          <li data-target="9" className="cursor-pointer">
                            Under <strong>Default Time Settings</strong>, set
                            the <strong>Default Start Time</strong> and{" "}
                            <strong>Default End Time</strong> to define working
                            hours, and click{" "}
                            <strong>Apply Default Time to All Days</strong> if
                            the same schedule applies across the week.
                            <div>
                              <img
                                src="assets/image/content/default-time.PNG"
                                className="mobile-step-img"
                                style={{ objectFit: "contain" }}
                              />
                            </div>
                          </li>
                          <li>
                            In the <strong>Select Working Days</strong> section:
                            <ul className="lists sub-steps">
                              <li data-target="10" className="cursor-pointer">
                                Check the boxes for the days the doctor is
                                available.
                                <div>
                                  <img
                                    src="assets/image/content/docdetails.png"
                                    className="mobile-step-img"
                                    style={{ objectFit: "contain" }}
                                  />
                                </div>
                              </li>
                              <li data-target="11" className="cursor-pointer">
                                For each selected day, enter the{" "}
                                <strong>Start Time</strong> and{" "}
                                <strong>End Time</strong>. If the shift timing
                                is the same for more than one day, you can{" "}
                                <strong>copy the shift</strong> and{" "}
                                <strong>paste it to another day</strong> for
                                quicker setup.
                                <div>
                                  <img
                                    src="assets/image/content/doc-copy.PNG"
                                    className="mobile-step-img"
                                    style={{ objectFit: "contain" }}
                                  />
                                </div>
                              </li>
                              <li data-target="12" className="cursor-pointer">
                                Click <strong>Add Another Shift</strong> to add
                                multiple working shifts for the same day.
                                <div>
                                  <img
                                    src="assets/image/content/add-shift.PNG"
                                    className="mobile-step-img"
                                    style={{ objectFit: "contain" }}
                                  />
                                </div>
                              </li>
                              <li data-target="13" className="cursor-pointer">
                                Use the <strong>Trash Icon</strong> to remove an
                                unwanted shift.
                                <div>
                                  <img
                                    src="assets/image/content/trash-icon.PNG"
                                    className="mobile-step-img"
                                    style={{ objectFit: "contain" }}
                                  />
                                </div>
                              </li>
                            </ul>
                          </li>

                          <li data-target="14" className="cursor-pointer">
                            Once all details and shifts are configured, click
                            <strong>Add Doctor</strong> to save the record.
                            <div>
                              <img
                                src="assets/image/content/add-doctor.PNG"
                                className="mobile-step-img"
                                style={{ objectFit: "contain" }}
                              />
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div className="col-4 ">
                        <div className="stack ">
                          <div>
                            <img
                              src="assets/image/content/pagination.png"
                              style={{ objectFit: "contain" }}
                            />
                          </div>
                          <div>
                            <img
                              src="assets/image/content/docSearch.png"
                              style={{ objectFit: "contain" }}
                              alt=""
                            />
                          </div>
                          <div>
                            <img
                              src="assets/image/content/docdrop.png"
                              style={{ objectFit: "contain" }}
                              alt=""
                            />
                          </div>
                          <div>
                            <img
                              src="assets/image/content/docdetails.png"
                              style={{ objectFit: "contain" }}
                            />
                          </div>
                          <div>
                            <img
                              src="assets/image/content/action.png"
                              style={{ objectFit: "contain " }}
                            />
                          </div>
                          <div>
                            <img
                              src="assets/image/content/delAction.png "
                              style={{ objectFit: "contain" }}
                              alt=""
                            />
                          </div>
                          <div>
                            <img
                              src="assets/image/content/add-doctor-btn.PNG"
                              style={{ objectFit: "contain" }}
                              alt=""
                            />
                          </div>
                          <div>
                            <img
                              src="assets/image/content/doc-num-lang.PNG"
                              style={{ objectFit: "contain" }}
                              alt=""
                            />
                          </div>
                          <div>
                            <img
                              src="assets/image/content/default-time.PNG"
                              style={{ objectFit: "contain" }}
                              alt=""
                            />
                          </div>
                          <div>
                            <img
                              src="assets/image/content/doc-checkbox.PNG"
                              style={{ objectFit: "contain" }}
                              alt=""
                            />
                          </div>
                          <div>
                            <img
                              src="assets/image/content/doc-copy.PNG"
                              style={{ objectFit: "contain" }}
                              alt=""
                            />
                          </div>
                          <div>
                            <img
                              src="assets/image/content/add-shift.PNG"
                              style={{ objectFit: "contain" }}
                              alt=""
                            />
                          </div>
                          <div>
                            <img
                              src="assets/image/content/trash-icon.PNG"
                              style={{ objectFit: "contain" }}
                              alt=""
                            />
                          </div>
                          <div>
                            <img
                              src="assets/image/content/add-doctor.PNG"
                              style={{ objectFit: "contain" }}
                              alt=""
                            />
                          </div>
                          <div>
                            <img
                              src="assets/image/content/doc.png"
                              style={{ objectFit: "contain" }}
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <h4 className="mt-5">Doctor Leave</h4>
                <ul className="nav nav-tabs mt-3" id="leaveTab" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link active"
                      id="preview-leave-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#preview-leave"
                      type="button"
                      role="tab"
                    >
                      {" "}
                      <i className="ri-eye-line"></i>
                      Preview
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="usage-leave-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#usage-leave"
                      type="button"
                      role="tab"
                    >
                      {" "}
                      <span className="material-symbols-outlined">
                        build
                      </span>{" "}
                      Usage
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="howto-leave-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#howto-leave"
                      type="button"
                      role="tab"
                    >
                      {" "}
                      <span className="material-symbols-outlined">
                        menu_book
                      </span>{" "}
                      How to Use
                    </button>
                  </li>
                </ul>

                <div
                  className="tab-content second-content"
                  id="leaveTabContent"
                >
                  <div
                    className="tab-pane fade show active"
                    id="preview-leave"
                    role="tabpanel"
                  >
                    <img
                      src="./assets/image/content/doctor-leave-img.png"
                      alt="not found"
                    />
                  </div>
                  {/*Doctor Leave Usage */}
                  <div
                    className="tab-pane fade"
                    id="usage-leave"
                    role="tabpanel"
                    aria-labelledby="usage-leave-tab"
                  >
                    <p>
                      <strong>What it is:</strong>
                    </p>
                    <p>
                      The <strong>Doctor Leave</strong> section manages doctors’
                      scheduled leaves, ensuring that patients are not booked
                      with unavailable doctors. It also helps maintain balanced
                      staffing across all departments.
                    </p>

                    <p>
                      <strong>Description:</strong>
                    </p>
                    <p>
                      {" "}
                      Includes <strong>Serial Number (#)</strong>,{" "}
                      <strong>Doctor Name</strong>,<strong>Department</strong>,
                      and <strong>Leave Details</strong> (Start Date, End Date,
                      Reason).
                    </p>
                    <ul className="lists">
                      <li>
                        <strong>Add Leave button:</strong> create a new leave
                        entry for a doctor.
                      </li>
                      <li>
                        <strong>Search bar:</strong> quickly find leave records
                        by doctor name or department.
                      </li>
                      <li>
                        <strong>Filter option:</strong> choose how many entries
                        to display (e.g., 10, 25, 50).
                      </li>
                      <li>
                        <strong>Actions menu:</strong> update or delete leave
                        records.
                      </li>
                      <li>
                        <strong>Sorting:</strong> click on column headers (e.g.,
                        Doctor Name, Department, Start Date) to sort data in
                        ascending or descending order.
                      </li>
                      <li>
                        <strong>Pagination:</strong> navigate through leave
                        records and view total entries (e.g., Showing 1 to 10 of
                        30 entries).
                      </li>
                    </ul>
                  </div>

                  {/*Doctor Leave How to Use */}
                  <div
                    className="tab-pane fade"
                    id="howto-leave"
                    role="tabpanel"
                    aria-labelledby="howto-leave-tab"
                  >
                    <div className="d-md-flex justify-content-md-between col-md-10 col-11  ">
                      <div className="col-12 col-md-11 col-lg-7  ">
                        <p>
                          <strong>How to Use:</strong>
                        </p>
                        <ul className="lists steps">
                          <li data-target="9" className="cursor-pointer">
                            Open the <strong>Doctor Leave</strong> tab to view
                            all existing leave records.
                            <div>
                              <img
                                src="assets/image/content/docleave.png"
                                className="mobile-step-img"
                                style={{ objectFit: "contain" }}
                              />
                            </div>
                          </li>
                          <li data-target="2" className="cursor-pointer">
                            Use the <strong>Search bar</strong> to find a leave
                            entry by doctor name or department.
                            <div>
                              <img
                                src="assets/image/content/docleaveSearch.png"
                                className="mobile-step-img"
                                style={{ objectFit: "contain" }}
                              />
                            </div>
                          </li>
                          <li data-target="3" className="cursor-pointer">
                            Click the <strong>Filter dropdown</strong> to select
                            how many entries (e.g., 10, 25, 50) you want
                            displayed.
                            <div>
                              <img
                                src="assets/image/content/docdrop.png"
                                className="mobile-step-img"
                                style={{ objectFit: "contain" }}
                              />
                            </div>
                          </li>
                          <li data-target="4" className="cursor-pointer">
                            Review the list showing{" "}
                            <strong>Serial Number (#)</strong>,{" "}
                            <strong>Doctor Name</strong>,{" "}
                            <strong>Department</strong>, and{" "}
                            <strong>Leave Details</strong> (Start Date, End
                            Date, Reason).
                            <div>
                              <img
                                src="assets/image/content/leavedet.png"
                                className="mobile-step-img"
                                style={{ objectFit: "contain" }}
                              />
                            </div>
                          </li>
                          <li data-target="5" className="cursor-pointer">
                            To <strong>add a new leave</strong>, click the Add
                            <strong>Leave button</strong> → select the{" "}
                            <strong>Department</strong>, choose the
                            <strong>Doctor</strong>, set{" "}
                            <strong>Start Date</strong> and{" "}
                            <strong>End Date</strong>, and enter the{" "}
                            <strong>Reason for Leave</strong>, then click{" "}
                            <strong>Save</strong> (see reference image).
                            <div>
                              <img
                                src="assets/image/content/AddLeave.png"
                                className="mobile-step-img"
                                style={{ objectFit: "contain" }}
                              />
                            </div>
                          </li>
                          <li data-target="6" className="cursor-pointer">
                            Click the <strong>Edit</strong> icon under
                            <strong>Actions</strong> to update leave
                            information.
                            <div>
                              <img
                                src="assets/image/content/action.png"
                                className="mobile-step-img"
                                style={{ objectFit: "contain" }}
                              />
                            </div>
                          </li>
                          <li data-target="7" className="cursor-pointer">
                            Click the <strong>Delete</strong> icon under
                            <strong>Actions</strong> to remove outdated or
                            incorrect leave records.
                            <div>
                              <img
                                src="assets/image/content/delAction.png"
                                className="mobile-step-img"
                                style={{ objectFit: "contain" }}
                              />
                            </div>
                          </li>
                          <li data-target="8" className="cursor-pointer">
                            Use <strong>Sorting</strong> by clicking on column
                            headers (e.g., Doctor Name, Department, Start Date)
                            to arrange records in ascending or descending order.
                            <div>
                              <img
                                src="assets/image/content/doctor-leave-img.png"
                                className="mobile-step-img"
                                style={{ objectFit: "contain" }}
                              />
                            </div>
                          </li>
                          <li data-target="1" className="cursor-pointer">
                            Use <strong>Pagination controls</strong>
                            (left/right arrows) to navigate between pages of
                            leave entries (e.g., Showing 1 to 10 of 30 entries).
                            <div>
                              <img
                                src="assets/image/content/pagination.png"
                                className="mobile-step-img"
                                style={{ objectFit: "contain" }}
                              />
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div className="col-4 ">
                        <div className="stack ">
                          <div>
                            <img
                              src="assets/image/content/pagination.png"
                              style={{ objectFit: "contain" }}
                            />
                          </div>
                          <div>
                            <img
                              src="assets/image/content/docleaveSearch.png"
                              style={{ objectFit: "contain" }}
                              alt=""
                            />
                          </div>
                          <div>
                            <img
                              src="assets/image/content/docdrop.png"
                              style={{ objectFit: "contain" }}
                              alt=""
                            />
                          </div>
                          <div>
                            <img
                              src="assets/image/content/leavedet.png"
                              style={{ objectFit: "contain" }}
                            />
                          </div>
                          <div>
                            <img
                              src="assets/image/content/AddLeave.png"
                              style={{ objectFit: "contain" }}
                              alt=""
                            />
                          </div>
                          <div>
                            <img
                              src="assets/image/content/action.png"
                              style={{ objectFit: "contain" }}
                              alt=""
                            />
                          </div>
                          <div>
                            <img
                              src="assets/image/content/delAction.png"
                              style={{ objectFit: "contain " }}
                            />
                          </div>
                          <div>
                            <img
                              src="assets/image/content/doc-leav-sort.PNG"
                              alt=""
                              style={{ objectFit: "contain" }}
                            />
                          </div>
                          <div>
                            <img
                              src="assets/image/content/docleave.png"
                              alt=""
                              style={{ objectFit: "contain" }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*clinic management*/}
          <div className="gx-block" id="file_CliManage">
            <div className="gx-card gx-page-block">
              <div className="gx-card-header">
                <p className="second-main-title">Clinic Management</p>
                <div className="header-tools">
                  <a href="#" className="gx-full-card">
                    <i className="ri-fullscreen-fill"></i>
                  </a>
                </div>
              </div>
            </div>
            <div className="gx-card-content">
              <div className="intero">
                <h1>Clinic Management</h1>
                <p className="popins-data-helpex">
                  The Clinic Management section allows you to efficiently manage
                  clinic off days. It includes both
                  <strong>permanent day-offs</strong> (regular weekly closures)
                  and <strong>random day-offs</strong> (occasional leaves such
                  as public holidays or special events). You can easily{" "}
                  <strong>add, view, or delete</strong> leave records as needed
                  to keep clinic operations organized and up to date.
                </p>

                <h4 className="mt-4">Permanent Day-Off</h4>
                <ul className="nav nav-tabs mt-3" id="permTab" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link active"
                      id="perm-preview-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#perm-preview"
                      type="button"
                      role="tab"
                      aria-controls="perm-preview"
                      aria-selected="true"
                    >
                      <i className="ri-eye-line"></i>Preview
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="perm-usage-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#perm-usage"
                      type="button"
                      role="tab"
                      aria-controls="perm-usage"
                      aria-selected="false"
                    >
                      <span className="material-symbols-outlined">build</span>
                      Usage
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="perm-how-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#perm-how"
                      type="button"
                      role="tab"
                      aria-controls="perm-how"
                      aria-selected="false"
                    >
                      <span className="material-symbols-outlined">
                        menu_book
                      </span>
                      How to Use
                    </button>
                  </li>
                </ul>

                <div className="tab-content second-content" id="permTabContent">
                  <div
                    className="tab-pane fade show active"
                    id="perm-preview"
                    role="tabpanel"
                    aria-labelledby="perm-preview-tab"
                  >
                    <img
                      src="./assets/image/content/clinic-img.png"
                      alt="Permanent Day-Off Preview"
                    />
                  </div>
                  {/*Permanent Day Off: What it is */}
                  <div
                    className="tab-pane fade"
                    id="perm-usage"
                    role="tabpanel"
                    aria-labelledby="perm-usage-tab"
                  >
                    <p>
                      <strong>What it is:</strong>
                    </p>
                    <p>
                      The <strong>Permanent Day-Off</strong> section allows you
                      to assign fixed weekly off days for the clinic, such as
                      Sundays. These days automatically recur each week,
                      ensuring consistent scheduling and preventing bookings on
                      closed days.
                    </p>

                    <p>
                      <strong>Description:</strong>
                    </p>
                    <ul className="lists">
                      <li>
                        Displays <strong>Serial Number (#)</strong>,{" "}
                        <strong>Holiday Day</strong> (e.g., Sunday), and
                        <strong>Action</strong> buttons (<strong>Edit</strong>{" "}
                        and <strong>Delete</strong> ).
                      </li>
                      <li>
                        Each selected day is automatically applied as a
                        recurring weekly closure.
                      </li>
                      <li>
                        Admins can easily <strong>edit</strong> or{" "}
                        <strong>remove</strong> permanent holidays as needed.
                      </li>
                      <li>
                        A <strong>search bar</strong> allows quick lookup of
                        specific days.
                      </li>
                      <li>
                        <strong>Pagination</strong> appears when multiple
                        records are listed.
                      </li>
                    </ul>
                  </div>

                  {/*Permanent Day Off: How to Use */}
                  <div
                    className="tab-pane fade"
                    id="perm-how"
                    role="tabpanel"
                    aria-labelledby="perm-how-tab"
                  >
                    <div className="d-md-flex justify-content-md-between col-md-10 col-11  ">
                      <div className="col-12 col-md-11 col-lg-7  ">
                        <p>
                          <strong>How to Use:</strong>
                        </p>
                        <ul className="lists steps">
                          <li data-target="8" className="cursor-pointer mb-3">
                            Open the <strong>Permanent Day-Off</strong>
                            tab under <strong>Clinic Management</strong>.
                            <div>
                              <img
                                src="assets/image/content/perm.png"
                                className="mobile-step-img"
                                style={{ objectFit: "contain" }}
                              />
                            </div>
                          </li>
                          <li data-target="2" className="cursor-pointer mb-3">
                            Click the <strong>Add Holiday</strong> button to
                            select a fixed weekly off day (e.g., Sunday) and
                            save it.
                            <div>
                              <img
                                src="assets/image/content/AddHoliday.png"
                                className="mobile-step-img"
                                style={{ objectFit: "contain" }}
                              />
                            </div>
                          </li>
                          <li data-target="3" className="cursor-pointer mb-3">
                            The chosen day will automatically apply as a
                            recurring weekly closure.
                            <div>
                              <img
                                src="assets/image/content/holiday.png"
                                className="mobile-step-img"
                                style={{ objectFit: "contain" }}
                              />
                            </div>
                          </li>
                          <li data-target="4" className="cursor-pointer mb-3">
                            Use the <strong>Edit (pencil icon)</strong> to
                            modify a day if required.
                            <div>
                              <img
                                src="assets/image/content/action.png"
                                className="mobile-step-img"
                                style={{ objectFit: "contain" }}
                              />
                            </div>
                          </li>
                          <li data-target="5" className="cursor-pointer mb-3">
                            Use the <strong>Delete (trash icon)</strong>
                            to remove any permanent day off.
                            <div>
                              <img
                                src="assets/image/content/delAction.png"
                                className="mobile-step-img"
                                style={{ objectFit: "contain" }}
                              />
                            </div>
                          </li>
                          <li data-target="6" className="cursor-pointer mb-3">
                            Use the <strong>Search bar</strong> to quickly find
                            specific holidays.
                            <div>
                              <img
                                src="assets/image/content/dayoffSearch.png"
                                className="mobile-step-img"
                                style={{ objectFit: "contain" }}
                              />
                            </div>
                          </li>
                          <li data-target="7" className="cursor-pointer mb-3">
                            Use the <strong>Sorting option</strong> to arrange
                            days in ascending or descending order.
                            <div>
                              <img
                                src="assets/image/content/per-leave-sort.PNG"
                                className="mobile-step-img"
                                style={{ objectFit: "contain" }}
                              />
                            </div>
                          </li>
                          <li data-target="1" className="cursor-pointer mb-3">
                            Use <strong>Pagination controls</strong> to navigate
                            through additional entries when multiple records
                            exist.
                            <div>
                              <img
                                src="assets/image/content/pagination.png"
                                className="mobile-step-img"
                                style={{ objectFit: "contain" }}
                              />
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div className="col-4 ">
                        <div className="stack ">
                          <div>
                            <img
                              src="assets/image/content/pagination.png"
                              style={{ objectFit: "contain" }}
                            />
                          </div>
                          <div>
                            <img
                              src="assets/image/content/AddHoliday.png"
                              style={{ objectFit: "contain" }}
                              alt=""
                            />
                          </div>
                          <div>
                            <img
                              src="assets/image/content/holiday.png"
                              alt=""
                            />
                          </div>
                          <div>
                            <img
                              src="assets/image/content/action.png"
                              style={{ objectFit: "contain" }}
                            />
                          </div>
                          <div>
                            <img
                              src="assets/image/content/delAction.png"
                              style={{ objectFit: "contain" }}
                              alt=""
                            />
                          </div>
                          <div>
                            <img
                              src="assets/image/content/dayoffSearch.png"
                              style={{ objectFit: "contain" }}
                              alt=""
                            />
                          </div>
                          <div>
                            <img
                              src="assets/image/content/per-leave-sort.PNG"
                              style={{ objectFit: "contain" }}
                            />
                          </div>
                          <div>
                            <img
                              src="assets/image/content/perm.png"
                              style={{ objectFit: "contain" }}
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <h4 className="mt-5">Random Day-Off</h4>
                <ul className="nav nav-tabs mt-3" id="randTab" role="tablist">
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link active"
                      id="rand-preview-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#rand-preview"
                      type="button"
                      role="tab"
                      aria-controls="rand-preview"
                      aria-selected="true"
                    >
                      <i className="ri-eye-line"></i>Preview
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="rand-usage-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#rand-usage"
                      type="button"
                      role="tab"
                      aria-controls="rand-usage"
                      aria-selected="false"
                    >
                      <span className="material-symbols-outlined">build</span>
                      Usage
                    </button>
                  </li>
                  <li className="nav-item" role="presentation">
                    <button
                      className="nav-link"
                      id="rand-how-tab"
                      data-bs-toggle="tab"
                      data-bs-target="#rand-how"
                      type="button"
                      role="tab"
                      aria-controls="rand-how"
                      aria-selected="false"
                    >
                      <span className="material-symbols-outlined">
                        menu_book
                      </span>
                      How to Use
                    </button>
                  </li>
                </ul>

                <div className="tab-content second-content" id="randTabContent">
                  <div
                    className="tab-pane fade show active"
                    id="rand-preview"
                    role="tabpanel"
                    aria-labelledby="rand-preview-tab"
                  >
                    <img
                      src="./assets/image/content/random-off-img.png"
                      alt="Random Day-Off Preview"
                    />
                  </div>
                  {/*Random Day Off: What it is */}
                  <div
                    className="tab-pane fade"
                    id="rand-usage"
                    role="tabpanel"
                    aria-labelledby="rand-usage-tab"
                  >
                    <p>
                      <strong>What it is:</strong>
                    </p>
                    <p>
                      The <strong>Random Day-Off</strong> section is used to
                      record one-time or occasional clinic closures, such as
                      public holidays, staff events, or maintenance days. These
                      are non-recurring and can be added, modified, or deleted
                      as needed.
                    </p>

                    <p>
                      <strong>Description:</strong>
                    </p>
                    <ul className="lists">
                      <li>
                        Displays <strong>Serial Number (#)</strong>,{" "}
                        <strong>Start Date</strong>, <strong>End Date</strong>,{" "}
                        <strong>Reason for Leave</strong>, and{" "}
                        <strong>Action Buttons</strong> (Edit and Delete).
                      </li>
                      <li>
                        Ideal for managing temporary or unplanned closures
                        (e.g., training sessions, holidays, maintenance).
                      </li>
                      <li>
                        <strong>Search Bar</strong> allows quick access to
                        specific entries.
                      </li>
                      <li>
                        <strong>Sort Option</strong> lets you organize records
                        in ascending or descending order.
                      </li>
                      <li>
                        <strong>Pagination</strong> helps navigate through
                        multiple records and allows setting how many entries to
                        display per page.
                      </li>
                    </ul>
                  </div>

                  {/*Random Day Off: How to Use */}
                  <div
                    className="tab-pane fade"
                    id="rand-how"
                    role="tabpanel"
                    aria-labelledby="rand-how-tab"
                  >
                    <div className="d-md-flex justify-content-md-between col-md-10 col-11  ">
                      <div className="col-12 col-md-11 col-lg-7  ">
                        <p>
                          <strong>How to Use:</strong>
                        </p>
                        <ul className="lists steps">
                          <li data-target="8" className="cursor-pointer mb-4">
                            Navigate to the Random Day-Off section in Clinic
                            Management.
                            <div>
                              <img
                                src="assets/image/content/rand.png"
                                className="mobile-step-img"
                                style={{ objectFit: "contain" }}
                              />
                            </div>
                          </li>
                          <li data-target="2" className="cursor-pointer mb-4">
                            Click <strong>Add Holiday</strong> button and choose
                            start and end dates for the leave.
                            <div>
                              <img
                                src="assets/image/content/AddHoliday.png"
                                className="mobile-step-img"
                                style={{ objectFit: "contain" }}
                              />
                            </div>
                          </li>
                          <li data-target="3" className="cursor-pointer mb-4">
                            Enter the reason (e.g., "Staff Training or
                            Workshop").
                            <div>
                              <img
                                src="assets/image/content/reason.png"
                                className="mobile-step-img"
                                style={{ objectFit: "contain" }}
                              />
                            </div>
                          </li>
                          <li data-target="4" className="cursor-pointer mb-4">
                            Save the entry to confirm the day off.
                            <div>
                              <img
                                src="assets/image/content/Save.png"
                                className="mobile-step-img"
                                style={{ objectFit: "contain" }}
                              />
                            </div>
                          </li>
                          <li data-target="5" className="cursor-pointer mb-4">
                            Use the <strong>Edit</strong> (pencil icon) to
                            modify the entry anytime.
                            <div>
                              <img
                                src="assets/image/content/action.png"
                                className="mobile-step-img"
                                style={{ objectFit: "contain" }}
                              />
                            </div>
                          </li>
                          <li data-target="6" className="cursor-pointer mb-4">
                            Use the <strong>Delete</strong> (trash icon) to
                            remove the leave entry.
                            <div>
                              <img
                                src="assets/image/content/delAction.png"
                                className="mobile-step-img"
                                style={{ objectFit: "contain" }}
                              />
                            </div>
                          </li>
                          <li data-target="7" className="cursor-pointer mb-4">
                            Use the search bar to quickly find specific holiday
                            entries.
                            <div>
                              <img
                                src="assets/image/content/dayoffSearch.png"
                                className="mobile-step-img"
                                style={{ objectFit: "contain" }}
                              />
                            </div>
                          </li>
                          <li data-target="1" className="cursor-pointer mb-4">
                            Navigate between pages if more than one entry is
                            listed using pagination.
                            <div>
                              <img
                                src="assets/image/content/pagination.png"
                                className="mobile-step-img"
                                style={{ objectFit: "contain" }}
                              />
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div className="col-4 ">
                        <div className="stack ">
                          <div>
                            <img
                              src="assets/image/content/pagination.png"
                              style={{ objectFit: "contain" }}
                            />
                          </div>
                          <div>
                            <img
                              src="assets/image/content/AddHoliday.png"
                              style={{ objectFit: "contain" }}
                              alt=""
                            />
                          </div>
                          <div>
                            <img
                              src="assets/image/content/reason.png"
                              style={{ objectFit: "contain" }}
                              alt=""
                            />
                          </div>
                          <div>
                            <img
                              src="assets/image/content/Save.png"
                              style={{ objectFit: "contain" }}
                            />
                          </div>
                          <div>
                            <img
                              src="assets/image/content/action.png"
                              style={{ objectFit: "contain" }}
                              alt=""
                            />
                          </div>
                          <div>
                            <img
                              src="assets/image/content/delAction.png"
                              style={{ objectFit: "contain" }}
                              alt=""
                            />
                          </div>
                          <div>
                            <img
                              src="assets/image/content/dayoffSearch.png"
                              style={{ objectFit: "contain" }}
                              alt=""
                            />
                          </div>
                          <div>
                            <img
                              src="assets/image/content/rand.png"
                              style={{ objectFit: "contain" }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*Billing */}
          <div className="gx-block" id="file_Billing">
            <div className="gx-card gx-page-block">
              <div className="gx-card-header">
                <p className="second-main-title">Billing</p>
                <div className="header-tools">
                  <a href="#" className="gx-full-card">
                    <i className="ri-fullscreen-fill"></i>
                  </a>
                </div>
              </div>
              <div className="gx-card-content">
                <div className="intero">
                  <h1>Billing</h1>
                  <p className="popins-data-helpex">
                    The Billing section provides a complete view of all
                    user-subscribed subscriptions. It allows you to easily{" "}
                    <strong>search, subscribe, upgrade, or cancel</strong>{" "}
                    subscription as needed, ensuring your billing information
                    stays accurate and transparent. When purchasing a
                    subscription for the first time, you’ll need to{" "}
                    <strong>
                      select an available Twilio number according to your chose
                      country
                    </strong>{" "}
                    before completing the process.
                  </p>

                  <ul
                    className="nav nav-tabs mt-5"
                    id="billingTab"
                    role="tablist"
                  >
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link active"
                        id="billing-preview-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#billing-preview"
                        type="button"
                        role="tab"
                        aria-controls="billing-preview"
                        aria-selected="true"
                      >
                        <i className="ri-eye-line"></i>Preview
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="billing-usage-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#billing-usage"
                        type="button"
                        role="tab"
                        aria-controls="billing-usage"
                        aria-selected="false"
                      >
                        <span className="material-symbols-outlined">build</span>
                        Usage
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="billing-how-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#billing-how"
                        type="button"
                        role="tab"
                        aria-controls="billing-how"
                        aria-selected="false"
                      >
                        <span className="material-symbols-outlined">
                          menu_book
                        </span>
                        How to Use
                      </button>
                    </li>
                  </ul>

                  <div
                    className="tab-content second-content"
                    id="billingTabContent"
                  >
                    <div
                      className="tab-pane fade show active"
                      id="billing-preview"
                      role="tabpanel"
                      aria-labelledby="billing-preview-tab"
                    >
                      <img
                        src="./assets/image/content/billing-img.png"
                        alt="Billing Section Preview"
                      />
                    </div>

                    {/*Billing: What it is */}
                    <div
                      className="tab-pane fade"
                      id="billing-usage"
                      role="tabpanel"
                      aria-labelledby="billing-usage-tab"
                    >
                      <p>
                        <strong>What it is:</strong>
                      </p>
                      <p>
                        The Billing section helps you efficiently manage your
                        calling packages. It displays details of your active
                        subscription, including usage, renewal information, and
                        complete purchase history.
                      </p>

                      <p>
                        <strong>Description:</strong>
                      </p>
                      <ul className="lists">
                        <li>
                          Shows the <strong>Active Package</strong> with total
                          minutes, used minutes, and subscription validity.
                        </li>
                        <li>
                          Displays the <strong>renewal date and time</strong>{" "}
                          for the current package.
                        </li>
                        <li>
                          Includes a <strong>donut chart</strong> to visually
                          represent remaining minutes.
                        </li>
                        <li>
                          <strong>Purchase History</strong> lists all previous
                          packages with details like package name, duration,
                          total minutes, amount paid, start/end date, and
                          subscription status.
                        </li>
                        <li>
                          The <strong>Search bar</strong> allows you to filter
                          purchase history by package name, validity period, &
                          status.
                        </li>
                        <li>
                          <strong>Pagination </strong> lets you move through
                          multiple purchase records.
                        </li>
                        <li>
                          The <strong>Subscribe Package</strong> button opens
                          the package selection screen to purchase or renew a
                          plan.
                        </li>
                      </ul>
                    </div>

                    {/*Billing: How to Use */}
                    <div
                      className="tab-pane fade"
                      id="billing-how"
                      role="tabpanel"
                      aria-labelledby="billing-how-tab"
                    >
                      <div className="d-md-flex justify-content-md-between col-md-10 col-11  ">
                        <div className="col-12 col-md-11 col-lg-7  ">
                          <p>
                            <strong>How to Use:</strong>
                          </p>
                          <ul className="lists steps">
                            <li data-target="9" className="cursor-pointer">
                              Open the <strong>Billing</strong> tab from the
                              sidebar menu.
                              <div>
                                <img
                                  src="assets/image/content/billing.png"
                                  className="mobile-step-img"
                                  style={{ objectFit: "contain" }}
                                />
                              </div>
                            </li>
                            <li data-target="2" className="cursor-pointer">
                              Review your <strong>Active Package</strong>, which
                              displays:
                              <div>
                                <img
                                  src="assets/image/content/billingactive.png"
                                  className="mobile-step-img"
                                  style={{ objectFit: "contain" }}
                                />
                              </div>
                              <ul>
                                <li>Package name and duration</li>
                                <li>Used and remaining minutes</li>
                                <li>Next renewal date and time</li>
                              </ul>
                            </li>
                            <li data-target="3" className="cursor-pointer">
                              Scroll to the <strong>Purchase History</strong>
                              section to view all previous subscriptions,
                              including:
                              <div>
                                <img
                                  src="assets/image/content/packageDet.png"
                                  className="mobile-step-img"
                                  style={{ objectFit: "contain" }}
                                />
                              </div>
                              <ul>
                                <li>Package name</li>
                                <li>Duration and total minutes</li>
                                <li>Price paid</li>
                                <li>Start and end dates</li>
                              </ul>
                            </li>
                            <li data-target="4" className="cursor-pointer">
                              Use the <strong>Search Purchase</strong> bar to
                              quickly find past packages.
                              <div>
                                <img
                                  src="assets/image/content/billiingsearch.png"
                                  className="mobile-step-img"
                                  style={{ objectFit: "contain" }}
                                />
                              </div>
                            </li>
                            <li data-target="5" className="cursor-pointer">
                              Click the <strong>Subscribe Package</strong>
                              button to add a new subscription.
                              <div>
                                <img
                                  src="assets/image/content/subPackagebtn.png"
                                  className="mobile-step-img"
                                  style={{ objectFit: "contain" }}
                                />
                              </div>
                            </li>
                            <li className="cursor-pointer">
                              <strong>In the subscription screen:</strong>
                              <ul>
                                <li data-target="6" className="cursor-pointer">
                                  For the first time, select your
                                  <strong>Country</strong> from the dropdown.
                                  <div>
                                    <img
                                      src="assets/image/content/country.png"
                                      className="mobile-step-img"
                                      style={{ objectFit: "contain" }}
                                    />
                                  </div>
                                </li>
                                <li data-target="7" className="cursor-pointer">
                                  Choose a <strong>Twilio Number</strong>
                                  assigned to your selected region.
                                  <div>
                                    <img
                                      src="assets/image/content/twilio.png"
                                      className="mobile-step-img"
                                      style={{ objectFit: "contain" }}
                                    />
                                  </div>
                                </li>
                                <li data-target="8" className="cursor-pointer">
                                  Review and compare available packages:
                                  <div>
                                    <img
                                      src="assets/image/content/availPackage.png"
                                      className="mobile-step-img"
                                      style={{ objectFit: "contain" }}
                                    />
                                  </div>
                                  <ul>
                                    <li>
                                      <strong>Monthly Package:</strong> 30 days,
                                      100 minutes
                                    </li>
                                    <li>
                                      <strong>Monthly Super Package:</strong> 30
                                      days, 300 minutes
                                    </li>
                                    <li>
                                      <strong>Weekly Package:</strong> 7 days,
                                      100 minutes
                                    </li>
                                  </ul>
                                </li>
                              </ul>
                            </li>
                            <li data-target="1" className="cursor-pointer">
                              If you already have an active package, you can
                              <strong>cancel or upgrade</strong> by subscribing
                              to a new one.
                              <div>
                                <img
                                  src="assets/image/content/cancelsub.png"
                                  className="mobile-step-img"
                                  style={{ objectFit: "contain" }}
                                />
                              </div>
                            </li>
                            <li className="cursor-pointer">
                              Once subscribed, the{" "}
                              <strong>new package activates immediately</strong>
                              , replacing the previous one & can’t be
                              downgraded.
                            </li>
                          </ul>
                        </div>
                        <div className="col-4 ">
                          <div className="stack ">
                            <div>
                              <img
                                src="assets/image/content/cancelsub.png"
                                style={{ objectFit: "contain" }}
                              />
                            </div>
                            <div>
                              <img
                                src="assets/image/content/billingactive.png"
                                style={{ objectFit: "contain" }}
                                alt=""
                              />
                            </div>
                            <div>
                              <img
                                src="assets/image/content/packageDet.png"
                                style={{ objectFit: "contain" }}
                                alt=""
                              />
                            </div>
                            <div>
                              <img
                                src="assets/image/content/billiingsearch.png"
                                style={{ objectFit: "contain" }}
                              />
                            </div>
                            <div>
                              <img
                                src="assets/image/content/subPackagebtn.png"
                                style={{ objectFit: "contain" }}
                                alt=""
                              />
                            </div>
                            <div>
                              <img
                                src="assets/image/content/country.png"
                                style={{ objectFit: "contain" }}
                              />
                            </div>
                            <div>
                              <img
                                src="assets/image/content/twilio.png"
                                style={{ objectFit: "contain" }}
                                alt=""
                              />
                            </div>
                            <div>
                              <img
                                src="assets/image/content/availPackage.png"
                                style={{ objectFit: "contain" }}
                                alt=""
                              />
                            </div>
                            <div>
                              <img
                                src="assets/image/content/billing.png"
                                style={{ objectFit: "contain" }}
                                alt=""
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*Template Management */}
          <div className="gx-block" id="file_TempManage">
            <div className="gx-card gx-page-block">
              <div className="gx-card-header">
                <p className="second-main-title"> Template Management</p>
                <div className="header-tools">
                  <a href="#" className="gx-full-card">
                    <i className="ri-fullscreen-fill"></i>
                  </a>
                </div>
              </div>
              <div className="gx-card-content">
                <div className="intero">
                  <h1>Template Management</h1>
                  <p className="popins-data-helpex">
                    The Template Management section helps you efficiently
                    organize and customize communication templates used across{" "}
                    <strong>Email</strong>, <strong>WhatsApp</strong>, and{" "}
                    <strong>Polls</strong>. Each subsection includes built-in{" "}
                    <strong>search</strong>, <strong>edit</strong>, and
                    <strong>sort</strong> options to ensure templates remain
                    current and consistent.
                  </p>
                  <p className="popins-data-helpex">
                    These templates are used for{" "}
                    <strong>appointment confirmations</strong>,
                    <strong>rescheduling</strong>,{" "}
                    <strong>cancellations</strong>, <strong>reminders</strong>,
                    and <strong>patient feedback collection</strong>, ensuring
                    smooth and professional communication throughout the patient
                    journey.
                  </p>

                  <h2 className="mt-4">Email Template</h2>
                  <ul
                    className="nav nav-tabs mt-3"
                    id="emailTab"
                    role="tablist"
                  >
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link active"
                        id="email-preview-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#email-preview"
                        type="button"
                        role="tab"
                        aria-controls="email-preview"
                        aria-selected="true"
                      >
                        <i className="ri-eye-line"></i>Preview
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="email-usage-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#email-usage"
                        type="button"
                        role="tab"
                        aria-controls="email-usage"
                        aria-selected="false"
                      >
                        <span className="material-symbols-outlined">build</span>
                        Usage
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="email-how-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#email-how"
                        type="button"
                        role="tab"
                        aria-controls="email-how"
                        aria-selected="false"
                      >
                        <span className="material-symbols-outlined">
                          menu_book
                        </span>
                        How to Use
                      </button>
                    </li>
                  </ul>

                  <div
                    className="tab-content second-content"
                    id="emailTabContent"
                  >
                    <div
                      className="tab-pane fade show active"
                      id="email-preview"
                      role="tabpanel"
                      aria-labelledby="email-preview-tab"
                    >
                      <img
                        src="./assets/image/content/templates-img.png"
                        alt="Email Template Preview"
                      />
                    </div>
                    <div
                      className="tab-pane fade"
                      id="email-usage"
                      role="tabpanel"
                      aria-labelledby="email-usage-tab"
                    >
                      <p>
                        <strong>What it is:</strong>
                      </p>
                      <p>
                        The <strong>Email Templates</strong> section contains
                        predefined email messages automatically sent to patients
                        for various events, such as appointment confirmations,
                        cancellations, reminders, or completions.
                      </p>

                      <p>
                        <strong>Description:</strong>
                      </p>
                      <ul className="lists">
                        <li>
                          Each template includes a Name, Subject, and a
                          customizable Body that supports dynamic placeholders
                          like {"{name}"}, {"{doctor-name}"}, and others for
                          personalization.
                        </li>
                        <li>
                          Templates are organized by different
                          appointment-related scenarios—
                          <strong>confirmation</strong>,{" "}
                          <strong>reschedule</strong>,<strong>reminder</strong>,
                          and <strong>completion</strong>.
                        </li>
                        <li>
                          All templates can be easily edited using the{" "}
                          <strong>Action (Edit)</strong> pencil icon to update
                          content as needed.
                        </li>
                      </ul>
                    </div>

                    <div
                      className="tab-pane fade"
                      id="email-how"
                      role="tabpanel"
                      aria-labelledby="email-how-tab"
                    >
                      <div className="d-md-flex justify-content-md-between col-md-10 col-11  ">
                        <div className="col-12 col-md-11 col-lg-7  ">
                          <p>
                            <strong>How to Use It:</strong>
                          </p>
                          <ul className="lists steps">
                            <li data-target="5" className="cursor-pointer mb-2">
                              Open the <strong>Email Templates</strong>
                              section from the menu.
                              <div>
                                <img
                                  src="assets/image/content/email.png"
                                  className="mobile-step-img"
                                  style={{ objectFit: "contain" }}
                                />
                              </div>
                            </li>
                            <li
                              data-target="2"
                              className="cursor-pointer  mb-2"
                            >
                              Use the <strong>Search bar</strong> to find a
                              specific template or scroll through the list to
                              browse all available ones.
                              <div>
                                <img
                                  src="assets/image/content/emailSearch.png"
                                  className="mobile-step-img"
                                  style={{ objectFit: "contain" }}
                                />
                              </div>
                            </li>
                            <li
                              data-target="3"
                              className="cursor-pointer  mb-2"
                            >
                              Click the <strong>Edit icon</strong> under the{" "}
                              <strong>Actions</strong> column to modify the
                              template’s <strong>Subject</strong> or
                              <strong>Body</strong>.
                              <div>
                                <img
                                  src="assets/image/content/templateAction.png"
                                  className="mobile-step-img"
                                  style={{ objectFit: "contain" }}
                                />
                              </div>
                            </li>
                            <li
                              data-target="4"
                              className="cursor-pointer  mb-2"
                            >
                              Insert dynamic placeholders from the right panel
                              (e.g., {"{name}"}, {"{date-time}"},{" "}
                              {"{doctor-name}"}) to personalize messages.
                              <div>
                                <img
                                  src="assets/image/content/tempDetails.png"
                                  className="mobile-step-img"
                                  style={{ objectFit: "contain" }}
                                />
                              </div>
                            </li>
                            <li
                              data-target="1"
                              className="cursor-pointer  mb-2"
                            >
                              Click <strong>Preview & Save</strong> to review
                              and confirm your updates.
                              <div>
                                <img
                                  src="assets/image/content/Preview & Save.png"
                                  className="mobile-step-img"
                                  style={{ objectFit: "contain" }}
                                />
                              </div>
                            </li>
                          </ul>
                        </div>
                        <div className="col-4 ">
                          <div className="stack ">
                            <div>
                              <img
                                src="assets/image/content/Preview & Save.png"
                                style={{ objectFit: "contain" }}
                              />
                            </div>
                            <div>
                              <img
                                src="assets/image/content/emailSearch.png"
                                style={{ objectFit: "contain" }}
                                alt=""
                              />
                            </div>
                            <div>
                              <img
                                src="assets/image/content/templateAction.png"
                                style={{ objectFit: "contain" }}
                                alt=""
                              />
                            </div>
                            <div>
                              <img
                                src="assets/image/content/tempDetails.png"
                                style={{ objectFit: "contain" }}
                              />
                            </div>
                            <div>
                              <img
                                src="assets/image/content/email.png"
                                style={{ objectFit: "contain" }}
                                alt=""
                              />
                            </div>
                          </div>
                        </div>
                        <div></div>
                      </div>
                    </div>
                  </div>

                  <h2 className="mt-5">WhatsApp Template</h2>
                  <ul
                    className="nav nav-tabs mt-3"
                    id="whatsappTab"
                    role="tablist"
                  >
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link active"
                        id="whatsapp-preview-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#whatsapp-preview"
                        type="button"
                        role="tab"
                        aria-controls="whatsapp-preview"
                        aria-selected="true"
                      >
                        <i className="ri-eye-line"></i>Preview
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="whatsapp-usage-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#whatsapp-usage"
                        type="button"
                        role="tab"
                        aria-controls="whatsapp-usage"
                        aria-selected="false"
                      >
                        <span className="material-symbols-outlined">build</span>
                        Usage
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="whatsapp-how-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#whatsapp-how"
                        type="button"
                        role="tab"
                        aria-controls="whatsapp-how"
                        aria-selected="false"
                      >
                        <span className="material-symbols-outlined">
                          menu_book
                        </span>
                        How to Use
                      </button>
                    </li>
                  </ul>

                  <div
                    className="tab-content second-content"
                    id="whatsappTabContent"
                  >
                    <div
                      className="tab-pane fade show active"
                      id="whatsapp-preview"
                      role="tabpanel"
                      aria-labelledby="whatsapp-preview-tab"
                    >
                      <img
                        src="./assets/image/content/whatsapp-template-img.png"
                        alt="WhatsApp Template Preview"
                      />
                    </div>
                    <div
                      className="tab-pane fade"
                      id="whatsapp-usage"
                      role="tabpanel"
                      aria-labelledby="whatsapp-usage-tab"
                    >
                      <p>
                        <strong>What it is:</strong>
                      </p>
                      <p>
                        The <strong>WhatsApp Templates </strong> section
                        contains pre-written message formats used for
                        communicating with patients through WhatsApp. These
                        templates are designed for appointment confirmations,
                        reminders, cancellations, and other important
                        notifications.
                      </p>

                      <p>
                        <strong>Description:</strong>
                      </p>
                      <ul className="lists">
                        <li>
                          Ensures quick, consistent, and professional
                          communication with patients.
                        </li>
                        <li>
                          Supports <strong>dynamic placeholders</strong> (e.g.,{" "}
                          {"{name}"}, {"{doctor-name}"},{"{appointment-date}"})
                          for personalized messages.
                        </li>
                        <li>
                          Use the <strong>Action icons</strong> to edit
                          templates based on need.
                        </li>
                      </ul>
                    </div>

                    <div
                      className="tab-pane fade"
                      id="whatsapp-how"
                      role="tabpanel"
                      aria-labelledby="whatsapp-how-tab"
                    >
                      <div className="d-md-flex justify-content-md-between col-md-10 col-11  ">
                        <div className="col-12 col-md-11 col-lg-7  ">
                          <p>
                            <strong>How to Use It:</strong>
                          </p>
                          <ul className="lists steps ">
                            <li data-target="6" className="cursor-pointer mb-4">
                              Open the <strong>WhatsApp Templates</strong>
                              section.
                              <div>
                                <img
                                  src="assets/image/content/whatsapp-template.png"
                                  className="mobile-step-img"
                                  style={{ objectFit: "contain" }}
                                />
                              </div>
                            </li>
                            <li data-target="2" className="cursor-pointer mb-4">
                              Use the <strong>Search bar</strong> to quickly
                              locate a specific template.
                              <div>
                                <img
                                  src="assets/image/content/whatsappSearch.png"
                                  className="mobile-step-img"
                                  style={{ objectFit: "contain" }}
                                />
                              </div>
                            </li>
                            <li data-target="3" className="cursor-pointer mb-4">
                              Click the <strong>Edit icon</strong> under Actions
                              to modify the message content.
                              <div>
                                <img
                                  src="assets/image/content/templateAction.png"
                                  className="mobile-step-img"
                                  style={{ objectFit: "contain" }}
                                />
                              </div>
                            </li>
                            <li data-target="4" className="cursor-pointer mb-4">
                              Insert <strong>dynamic placeholders</strong>
                              (e.g., {"{name}"}, {"{appointment-date}"}) where
                              needed and click <strong>Save</strong>.
                              <div>
                                <img
                                  src="assets/image/content/tempDetails.png"
                                  className="mobile-step-img"
                                  style={{ objectFit: "contain" }}
                                />
                              </div>
                            </li>
                            <li data-target="5" className="cursor-pointer mb-4">
                              Click Preview & Save to review and confirm your
                              updates.
                              <div>
                                <img
                                  src="assets/image/content/docdrop.png"
                                  className="mobile-step-img"
                                  style={{ objectFit: "contain" }}
                                />
                              </div>
                            </li>
                          </ul>
                        </div>
                        <div className="col-4 ">
                          <div className="stack ">
                            <div>
                              <img
                                src="assets/image/content/pagination.png "
                                style={{ objectFit: "contain" }}
                              />
                            </div>
                            <div>
                              <img
                                src="assets/image/content/whatsappSearch.png"
                                style={{ objectFit: "contain" }}
                                alt=""
                              />
                            </div>
                            <div>
                              <img
                                src="assets/image/content/templateAction.png"
                                style={{ objectFit: "contain" }}
                                alt=""
                              />
                            </div>
                            <div>
                              <img
                                src="assets/image/content/tempDetails.png"
                                style={{ objectFit: "contain" }}
                              />
                            </div>
                            <div>
                              <img
                                src="assets/image/content/docdrop.png"
                                style={{ objectFit: "contain" }}
                              />
                            </div>
                            <div>
                              <img
                                src="assets/image/content/whatsapp-template.png"
                                style={{ objectFit: "contain" }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h2 className="mt-5">Poll Template</h2>
                  <ul className="nav nav-tabs mt-3" id="pollTab" role="tablist">
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link active"
                        id="poll-preview-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#poll-preview"
                        type="button"
                        role="tab"
                        aria-controls="poll-preview"
                        aria-selected="true"
                      >
                        <i className="ri-eye-line"></i>Preview
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="poll-usage-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#poll-usage"
                        type="button"
                        role="tab"
                        aria-controls="poll-usage"
                        aria-selected="false"
                      >
                        <span className="material-symbols-outlined">build</span>
                        Usage
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="poll-how-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#poll-how"
                        type="button"
                        role="tab"
                        aria-controls="poll-how"
                        aria-selected="false"
                      >
                        <span className="material-symbols-outlined">
                          menu_book
                        </span>
                        How to Use
                      </button>
                    </li>
                  </ul>

                  <div
                    className="tab-content second-content"
                    id="pollTabContent"
                  >
                    <div
                      className="tab-pane fade show active"
                      id="poll-preview"
                      role="tabpanel"
                      aria-labelledby="poll-preview-tab"
                    >
                      <img
                        src="./assets/image/content/poll-template-img.png"
                        alt="Poll Template Preview"
                      />
                    </div>
                    <div
                      className="tab-pane fade"
                      id="poll-usage"
                      role="tabpanel"
                      aria-labelledby="poll-usage-tab"
                    >
                      <p>
                        <strong>What it is:</strong>
                      </p>
                      <p>
                        The <strong>Poll Templates</strong> section is designed
                        to gather structured patient feedback through
                        survey-style questions, such as satisfaction ratings or
                        service evaluations.
                      </p>

                      <p>
                        <strong>Description:</strong>
                      </p>
                      <ul className="lists">
                        <li>
                          Each poll includes a <strong>question</strong> with
                          predefined <strong>answer</strong>
                          options (e.g., ratings from 1 to 5).
                        </li>
                        <li>
                          Polls can be <strong>edited or updated</strong>{" "}
                          anytime to align with changing feedback needs.
                        </li>
                        <li>
                          Primarily used{" "}
                          <strong>post-consultation or treatment</strong> to
                          measure patient satisfaction and service quality.
                        </li>
                      </ul>
                    </div>

                    <div
                      className="tab-pane fade"
                      id="poll-how"
                      role="tabpanel"
                      aria-labelledby="poll-how-tab"
                    >
                      <div className="d-md-flex justify-content-md-between col-md-10 col-11  ">
                        <div className="col-12 col-md-11 col-lg-7  ">
                          <p>
                            <strong>How to Use It:</strong>
                          </p>
                          <ul className="lists steps  ">
                            <li data-target="7" className="cursor-pointer mb-4">
                              Navigate to the <strong>Poll Templates</strong>{" "}
                              section.
                              <div>
                                <img
                                  src="assets/image/content/poll-template.png"
                                  className="mobile-step-img"
                                  style={{ objectFit: "contain" }}
                                />
                              </div>
                            </li>
                            <li
                              data-target="2"
                              className="cursor-pointer  mb-4"
                            >
                              Browse the list or use the{" "}
                              <strong>Search bar</strong> to quickly find a
                              specific poll.
                              <div>
                                <img
                                  src="assets/image/content/emailSearch.png"
                                  className="mobile-step-img"
                                  style={{ objectFit: "contain" }}
                                />
                              </div>
                            </li>
                            <li
                              data-target="3"
                              className="cursor-pointer  mb-4"
                            >
                              Click the <strong>Edit</strong> icon under Actions
                              to modify a poll’s question or answer options.
                              <div>
                                <img
                                  src="assets/image/content/option.png"
                                  className="mobile-step-img"
                                  style={{ objectFit: "contain" }}
                                />
                              </div>
                            </li>
                            <li
                              data-target="4"
                              className="cursor-pointer  mb-4"
                            >
                              Use <strong>Add Option</strong> to include
                              additional response choices.
                              <div>
                                <img
                                  src="assets/image/content/addOption.png"
                                  className="mobile-step-img"
                                  style={{ objectFit: "contain" }}
                                />
                              </div>
                            </li>
                            <li data-target="6" className="cursor-pointer mb-4">
                              Use <strong>Remove</strong> Icon to remove extra
                              options.
                              <div>
                                <img
                                  src="assets/image/content/temp-del.PNG"
                                  className="mobile-step-img"
                                  style={{ objectFit: "contain" }}
                                />
                              </div>
                            </li>
                            <li
                              data-target="5"
                              className="cursor-pointer  mb-4"
                            >
                              Click <strong>Submit</strong> to save your
                              updates.
                              <div>
                                <img
                                  src="assets/image/content/Submit.png"
                                  className="mobile-step-img"
                                  style={{ objectFit: "contain" }}
                                />
                              </div>
                            </li>
                          </ul>
                        </div>
                        <div className="col-4">
                          <div className="stack ">
                            <div>
                              <img
                                src="assets/image/content/pagination.png "
                                style={{ objectFit: "contain" }}
                              />
                            </div>
                            <div>
                              <img
                                src="assets/image/content/emailSearch.png"
                                style={{ objectFit: "contain" }}
                                alt=""
                              />
                            </div>
                            <div>
                              <img
                                src="assets/image/content/option.png"
                                style={{ objectFit: "contain" }}
                                alt=""
                              />
                            </div>
                            <div>
                              <img
                                src="assets/image/content/addOption.png "
                                style={{ objectFit: "contain" }}
                              />
                            </div>
                            <div>
                              <img
                                src="assets/image/content/Submit.png "
                                style={{ objectFit: "contain" }}
                              />
                            </div>
                            <div>
                              <img
                                src="assets/image/content/temp-del.PNG "
                                style={{ objectFit: "contain" }}
                              />
                            </div>
                            <div>
                              <img
                                src="assets/image/content/poll-template.png "
                                style={{ objectFit: "contain" }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/*System Management */}
          <div className="gx-block" id="file_SystemManage">
            <div className="gx-card gx-page-block">
              <div className="gx-card-header">
                <p className="second-main-title">System Settings</p>
                <div className="header-tools">
                  <a href="#" className="gx-full-card">
                    <i className="ri-fullscreen-fill"></i>
                  </a>
                </div>
              </div>
              <div className="gx-card-content">
                <div className="intero">
                  <h1>System Settings</h1>
                  <p className="popins-data-helpex">
                    The <strong>System Settings</strong> section allows you to
                    manage key configurations that control how the application
                    operates. It includes options for setting notification
                    intervals, configuring WhatsApp integration, and updating
                    logo settings. Each setting ensures smooth system
                    performance and allows customization according to
                    organizational preferences.
                  </p>

                  <h2 className="mt-4">Notification Interval</h2>
                  <ul
                    className="nav nav-tabs mt-3"
                    id="notifyTab"
                    role="tablist"
                  >
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link active"
                        id="notify-preview-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#notify-preview"
                        type="button"
                        role="tab"
                        aria-controls="notify-preview"
                        aria-selected="true"
                      >
                        <i className="ri-eye-line"></i>Preview
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="notify-usage-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#notify-usage"
                        type="button"
                        role="tab"
                        aria-controls="notify-usage"
                        aria-selected="false"
                      >
                        <span className="material-symbols-outlined">build</span>
                        Usage
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="notify-how-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#notify-how"
                        type="button"
                        role="tab"
                        aria-controls="notify-how"
                        aria-selected="false"
                      >
                        <span className="material-symbols-outlined">
                          menu_book
                        </span>
                        How to Use
                      </button>
                    </li>
                  </ul>

                  <div
                    className="tab-content second-content"
                    id="notifyTabContent"
                  >
                    <div
                      className="tab-pane fade show active"
                      id="notify-preview"
                      role="tabpanel"
                      aria-labelledby="notify-preview-tab"
                    >
                      <img
                        src="./assets/image/content/setting-img.png"
                        alt="Notification Interval Preview"
                      />
                    </div>
                    <div
                      className="tab-pane fade"
                      id="notify-usage"
                      role="tabpanel"
                      aria-labelledby="notify-usage-tab"
                    >
                      <p>
                        <strong>What it is:</strong>
                      </p>
                      <p>
                        The Automated Reminders section enables administrators
                        to set up and control when reminders are automatically
                        sent through Email, WhatsApp, and Polls.
                      </p>
                      <p>
                        <strong>Description:</strong>
                      </p>
                      <ul className="lists">
                        <li>
                          Allows configuration of{" "}
                          <strong>Email Notifications</strong> with ON/OFF
                          toggle, template selection, and customizable intervals
                          (e.g., “30 Minutes Before Appointment”).
                        </li>
                        <li>
                          Provides <strong>WhatsApp Notifications</strong> with
                          similar options for toggling, template selection, and
                          timing.
                        </li>
                        <li>
                          Includes <strong>Poll Notifications</strong>, which
                          are automatically sent after an appointment is
                          completed to collect patient feedback.
                        </li>
                        <li>
                          Reminder scheduling and delivery are handled through{" "}
                          <strong>cron jobs</strong>, ensuring timely and
                          automated message dispatch.
                        </li>
                      </ul>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="notify-how"
                      role="tabpanel"
                      aria-labelledby="notify-how-tab"
                    >
                      <div className="d-md-flex justify-content-md-between col-md-10 col-11  ">
                        <div className="col-12 col-md-11 col-lg-7  ">
                          <p>
                            <strong>How to Use It:</strong>
                          </p>
                          <ul className="lists steps">
                            <li data-target="5" className="cursor-pointer">
                              Open the <strong>Automated Reminders</strong>
                              subsection.
                              <div>
                                <img
                                  src="assets/image/content/notification-interval.png"
                                  className="mobile-step-img"
                                  style={{ objectFit: "contain" }}
                                />
                              </div>
                            </li>
                            <li data-target="2" className="cursor-pointer">
                              Turn <strong>ON</strong> the reminder type you
                              want to activate (Email, WhatsApp, or Poll).
                              <div>
                                <img
                                  src="assets/image/content/notification.png"
                                  className="mobile-step-img"
                                  style={{ objectFit: "contain" }}
                                />
                              </div>
                            </li>
                            <li data-target="5" className="cursor-pointer">
                              Select the appropriate{" "}
                              <strong>reminder template</strong> from the list.
                              <div>
                                <img
                                  src="assets/image/content/notification-interval.png"
                                  className="mobile-step-img"
                                  style={{ objectFit: "contain" }}
                                />
                              </div>
                            </li>
                            <li data-target="5" className="cursor-pointer">
                              Choose the <strong>time unit</strong> (e.g.,
                              minutes, hours, or days).
                              <div>
                                <img
                                  src="assets/image/content/notification-interval.png"
                                  className="mobile-step-img"
                                  style={{ objectFit: "contain" }}
                                />
                              </div>
                            </li>
                            <li data-target="3" className="cursor-pointer">
                              Set the <strong>time interval</strong> based on
                              the selected unit (e.g., “30 Minutes Before”).
                              <div>
                                <img
                                  src="assets/image/content/notifiTiming.png"
                                  className="mobile-step-img"
                                  style={{ objectFit: "contain" }}
                                />
                              </div>
                            </li>
                            <li data-target="4" className="cursor-pointer">
                              For <strong>Polls</strong>, choose the poll
                              template, set the time unit, and define the delay
                              (e.g., “30 Minutes After”).
                              <div>
                                <img
                                  src="assets/image/content/polltemp.png"
                                  className="mobile-step-img"
                                  style={{ objectFit: "contain" }}
                                />
                              </div>
                            </li>
                            <li data-target="1" className="cursor-pointer">
                              Click <strong>Save Settings</strong>, reminders
                              and polls will now be triggered automatically
                              based on your configurations.
                              <div>
                                <img
                                  src="assets/image/content/Save.png"
                                  className="mobile-step-img"
                                  style={{ objectFit: "contain" }}
                                />
                              </div>
                            </li>
                          </ul>
                        </div>
                        <div className="col-4 ">
                          <div className="stack ">
                            <div>
                              <img
                                src="assets/image/content/Save.png"
                                style={{ objectFit: "contain" }}
                              />
                            </div>
                            <div>
                              <img
                                src="assets/image/content/notification.png"
                                alt=""
                              />
                            </div>
                            <div>
                              <img
                                src="assets/image/content/notifiTiming.png"
                                alt=""
                              />
                            </div>
                            <div>
                              <img
                                src="assets/image/content/polltemp.png"
                                style={{ objectFit: "contain" }}
                              />
                            </div>
                            <div>
                              <img
                                src="assets/image/content/notification-interval.png"
                                style={{ objectFit: "contain" }}
                                alt=""
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h2 className="mt-5">WhatsApp Configuration</h2>
                  <ul className="nav nav-tabs mt-3" id="waTab" role="tablist">
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link active"
                        id="wa-preview-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#wa-preview"
                        type="button"
                        role="tab"
                        aria-controls="wa-preview"
                        aria-selected="true"
                      >
                        <i className="ri-eye-line"></i>Preview
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="wa-usage-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#wa-usage"
                        type="button"
                        role="tab"
                        aria-controls="wa-usage"
                        aria-selected="false"
                      >
                        <span className="material-symbols-outlined">build</span>
                        Usage
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className="nav-link"
                        id="wa-how-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#wa-how"
                        type="button"
                        role="tab"
                        aria-controls="wa-how"
                        aria-selected="false"
                      >
                        <span className="material-symbols-outlined">
                          menu_book
                        </span>
                        How to Use
                      </button>
                    </li>
                  </ul>

                  <div className="tab-content second-content" id="waTabContent">
                    <div
                      className="tab-pane fade show active"
                      id="wa-preview"
                      role="tabpanel"
                      aria-labelledby="wa-preview-tab"
                    >
                      <img
                        src="./assets/image/content/whatsapp-config-img.png"
                        alt="WhatsApp Config Preview"
                      />
                    </div>
                    <div
                      className="tab-pane fade"
                      id="wa-usage"
                      role="tabpanel"
                      aria-labelledby="wa-usage-tab"
                    >
                      <p>
                        <strong>What it is:</strong>
                      </p>
                      <p>
                        The <strong>WhatsApp Configuration</strong> section
                        connects your system with WhatsApp to automate patient
                        communication, including appointment confirmations,
                        reminders, follow-ups, and feedback polls. It ensures
                        smooth message delivery and stable integration with your
                        WhatsApp API setup.
                      </p>
                      <p>
                        <strong>Description:</strong>
                      </p>
                      <ul className="lists">
                        <li>
                          Displays all existing configurations with details such
                          as <strong>Instance ID</strong>,{" "}
                          <strong>Status</strong>, and{" "}
                          <strong>Actions (View Details)</strong>.
                        </li>
                        <li>
                          Allows adding a new configuration using the{" "}
                          <strong>Add New Config</strong> button (only once per
                          setup).
                        </li>
                        <li>
                          Requires entering{" "}
                          <strong>WhatsApp API credentials</strong> such as
                          <strong>Instance ID</strong>,{" "}
                          <strong>Webhook URL</strong>, and{" "}
                          <strong>Webhook Event</strong> to activate
                          WhatsApp-based reminders and notifications.
                        </li>
                        <li>
                          To configure WhatsApp for AI messaging or automated
                          notifications, the user must be subscribed to any
                          active package. Without an active subscription,
                          WhatsApp configuration cannot be completed.
                        </li>
                        <li>
                          If the user{" "}
                          <strong>disconnects their WhatsApp</strong> from the
                          panel, all automated WhatsApp chat, AI messaging, and
                          WhatsApp notifications will be{" "}
                          <strong>immediately disabled</strong>.
                        </li>
                      </ul>
                    </div>
                    <div
                      className="tab-pane fade"
                      id="wa-how"
                      role="tabpanel"
                      aria-labelledby="wa-how-tab"
                    >
                      <div className="d-md-flex justify-content-md-between col-md-10 col-11  ">
                        <div className="col-12 col-md-11 col-lg-7  ">
                          <p>
                            <strong>How to Use It:</strong>
                          </p>
                          <ul className="lists steps">
                            <li data-target="5" className="cursor-pointer mb-3">
                              Open the <strong>WhatsApp Configuration</strong>{" "}
                              subsection from System Settings.
                              <div>
                                <img
                                  src="assets/image/content/whatsapp-config.png"
                                  className="mobile-step-img"
                                  style={{ objectFit: "contain" }}
                                />
                              </div>
                            </li>
                            <li data-target="2" className="cursor-pointer mb-3">
                              Click <strong>Add WhatsApp Config </strong>
                              to create a new configuration.
                              <div>
                                <img
                                  src="assets/image/content/addwhatsappConfig.png"
                                  className="mobile-step-img"
                                  style={{ objectFit: "contain" }}
                                />
                              </div>
                            </li>
                            <li data-target="3" className="cursor-pointer mb-3">
                              After clicking <strong>Get Instance ID</strong>,
                              the required{" "}
                              <strong>WhatsApp API credentials</strong>{" "}
                              (Instance ID, Webhook URL, Webhook Event) will be
                              generated.
                              <div>
                                <img
                                  src="assets/image/content/instance.png"
                                  className="mobile-step-img"
                                  style={{ objectFit: "contain" }}
                                />
                              </div>
                            </li>
                            <li data-target="4" className="cursor-pointer mb-3">
                              On the main page, the configuration status will
                              show as <strong>Pending</strong>, click{" "}
                              <strong>View Icon</strong> to open the detail
                              page.
                              <div>
                                <img
                                  src="assets/image/content/view-icon.PNG"
                                  className="mobile-step-img"
                                  style={{ objectFit: "contain" }}
                                />
                              </div>
                            </li>
                            <li data-target="1" className="cursor-pointer mb-3">
                              Click <strong>Get QR Code</strong> and scan it
                              using your WhatsApp to link the account.
                              <div>
                                <img
                                  src="assets/image/content/QRCodebtn.png"
                                  className="mobile-step-img"
                                  style={{ objectFit: "contain" }}
                                />
                              </div>
                            </li>
                            <li className="cursor-pointer mb-3">
                              Once linked, all{" "}
                              <strong>reminders and notifications</strong> will
                              be sent{" "}
                              <strong>automatically via WhatsApp</strong>
                            </li>
                          </ul>
                        </div>
                        <div className="col-4">
                          <div className="stack ">
                            <div>
                              <img
                                src="assets/image/content/QRCodebtn.png"
                                style={{ objectFit: "contain" }}
                              />
                            </div>
                            <div>
                              <img
                                src="assets/image/content/addwhatsappConfig.png"
                                style={{ objectFit: "contain" }}
                                alt=""
                              />
                            </div>
                            <div>
                              <img
                                src="assets/image/content/instance.png"
                                style={{ objectFit: "contain" }}
                                alt=""
                              />
                            </div>
                            <div>
                              <img
                                src="assets/image/content/view-icon.PNG"
                                style={{ objectFit: "contain" }}
                                alt=""
                              />
                            </div>
                            <div>
                              <img
                                src="assets/image/content/whatsapp-config.png"
                                style={{ objectFit: "contain" }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* -----------Email configuration */}

                    <h2 className="mt-5">Email Configuration</h2>
                    <ul
                      className="nav nav-tabs mt-3"
                      id="logoTab"
                      role="tablist"
                    >
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link active"
                          id="logo-preview-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#logo-preview"
                          type="button"
                          role="tab"
                          aria-controls="logo-preview"
                          aria-selected="true"
                        >
                          <i className="ri-eye-line"></i>Preview
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link"
                          id="logo-usage-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#logo-usage"
                          type="button"
                          role="tab"
                          aria-controls="logo-usage"
                          aria-selected="false"
                        >
                          <span className="material-symbols-outlined">
                            build
                          </span>
                          Usage
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link"
                          id="logo-how-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#logo-how"
                          type="button"
                          role="tab"
                          aria-controls="logo-how"
                          aria-selected="false"
                        >
                          <span className="material-symbols-outlined">
                            menu_book
                          </span>
                          How to Use
                        </button>
                      </li>
                    </ul>

                    <div
                      className="tab-content second-content"
                      id="logoTabContent"
                    >
                      <div
                        className="tab-pane fade show active"
                        id="logo-preview"
                        role="tabpanel"
                        aria-labelledby="logo-preview-tab"
                      >
                        <img
                          src="./assets/image/content/email-config-setting.png"
                          alt="Logo Settings Preview"
                        />
                      </div>
                      {/*✅ 6. Logo Settings Section */}
                      <div
                        className="tab-pane fade"
                        id="logo-usage"
                        role="tabpanel"
                        aria-labelledby="logo-usage-tab"
                      >
                        <p>
                          <strong>What it is:</strong>
                        </p>
                        <p>
                          The <strong>Logo Settings</strong> section allows you
                          to manage your system’s branding by uploading logos
                          for both <strong>Light Mode</strong> and{" "}
                          <strong>Dark Mode</strong>. Your uploaded logo will be
                          displayed above the sidebar menu for consistent brand
                          visibility.
                        </p>
                        <p>
                          <strong>Description:</strong>
                        </p>
                        <ul className="lists">
                          <li>
                            Upload different logos for{" "}
                            <strong>Light Mode</strong> and{" "}
                            <strong>Dark Mode</strong> to match the system
                            theme.
                          </li>
                          <li>
                            Supports <strong>drag-and-drop</strong> or{" "}
                            <strong>click-to-upload</strong> functionality for
                            easy logo management.
                          </li>
                          <li>
                            Helps maintain <strong>consistent</strong> and{" "}
                            <strong>professional branding</strong>
                            across the entire application interface.
                          </li>
                        </ul>
                      </div>
                      <div
                        className="tab-pane fade how-to-use  "
                        id="logo-how"
                        role="tabpanel"
                        aria-labelledby="logo-how-tab"
                      >
                        <div className="d-md-flex justify-content-md-between col-9 ">
                          <div className="col-12 col-md-11 col-lg-7 pb-lg-5">
                            <p className="mb-2">
                              <strong>How to Use It:</strong>
                            </p>
                            <strong>How to Use of Email Config:</strong>
                            <ul className="lists steps ">
                              <li data-target="4" className="cursor-pointer">
                                Click <strong>Add Email Config</strong> to
                                create a new configuration.
                                <div>
                                  <img
                                    src="./assets/image/content/add-email-config.png"
                                    className="mobile-step-img"
                                    style={{ objectFit: "contain" }}
                                  />
                                </div>
                              </li>
                              <li data-target="2" className="cursor-pointer">
                                Enter your email address in the email field.
                                <div>
                                  <img
                                    src="assets/image/content/enter-email.png"
                                    className="mobile-step-img"
                                    style={{ objectFit: "contain" }}
                                  />
                                </div>
                              </li>

                              <li data-target="3" className="cursor-pointer">
                                <strong>
                                  Google App Password Setup (Gmail Users):
                                </strong>
                                <div>
                                  <img
                                    src="assets/image/content/google-app-setup.png"
                                    className="mobile-step-img"
                                    style={{ objectFit: "contain" }}
                                  />
                                </div>
                              </li>
                              <li data-target="5" className="cursor-pointer">
                                Click your profile icon (top right) and open{" "}
                                <strong>Manage Your Google Account</strong>.
                                <div>
                                  <img
                                    src="assets/image/content/profile-hide.png"
                                    className="mobile-step-img"
                                    style={{ objectFit: "contain" }}
                                  />
                                </div>
                              </li>

                              <li data-target="6" className="cursor-pointer">
                                Go to <strong>Security</strong> and enable{" "}
                                <strong>2-Step Verification</strong>.
                                <div>
                                  <img
                                    src="assets/image/content/step-verification.png"
                                    className="mobile-step-img"
                                    style={{ objectFit: "contain" }}
                                  />
                                </div>
                                <ul>
                                  <li
                                    data-target="7"
                                    className="cursor-pointer"
                                  >
                                    Search <strong>App Passwords</strong>, add
                                    your app name, and generate the password.
                                    <div>
                                      <img
                                        src="assets/image/content/open-app-password.png"
                                        className="mobile-step-img"
                                        style={{ objectFit: "contain" }}
                                      />
                                    </div>
                                  </li>
                                  <li
                                    data-target="8"
                                    className="cursor-pointer"
                                  >
                                    Copy the generated App Password before
                                    confirming.
                                    <div>
                                      <img
                                        src="assets/image/content/passcode.png"
                                        className="mobile-step-img"
                                        style={{ objectFit: "contain" }}
                                      />
                                    </div>
                                  </li>
                                </ul>
                              </li>

                              <strong>Complete Email Configuration: </strong>

                              <li data-target="9" className="cursor-pointer">
                                Paste the App Password into the password field.
                                <div>
                                  <img
                                    src="assets/image/content/paste-password.png"
                                    className="mobile-step-img"
                                    style={{ objectFit: "contain" }}
                                  />
                                </div>
                              </li>

                              <li data-target="10" className="cursor-pointer">
                                Add the <strong>SMTP host</strong>, select the{" "}
                                <strong>Port</strong>, and choose your{" "}
                                <strong>Email Service Provider</strong>.
                                <div>
                                  <img
                                    src="assets/image/content/port-img.png"
                                    className="mobile-step-img"
                                    style={{ objectFit: "contain" }}
                                  />
                                </div>
                              </li>

                              <ul className="lists steps  ">
                                <li data-target="11" className="cursor-pointer">
                                  Click <strong>Save</strong> to complete the
                                  setup.
                                  <div>
                                    <img
                                      src="assets/image/content/email-save.png"
                                      className="mobile-step-img"
                                      style={{ objectFit: "contain" }}
                                    />
                                  </div>
                                </li>

                                <li data-target="4" className="cursor-pointer">
                                  Once configured, all email notifications and
                                  reminders will be sent from your email
                                  address.
                                  <div>
                                    <img
                                      src="assets/image/content/LightDark.png"
                                      className="mobile-step-img"
                                      style={{ objectFit: "contain" }}
                                    />
                                  </div>
                                </li>
                              </ul>
                            </ul>
                          </div>
                          <div className="col-4">
                            <div className="stack ">
                              <div>
                                <img
                                  src="assets/image/content/Save Changes.png"
                                  style={{ objectFit: "contain" }}
                                />
                              </div>
                              <div>
                                <img
                                  src="assets/image/content/enter-email.png"
                                  style={{ objectFit: "contain" }}
                                  alt=""
                                />
                              </div>

                              <div>
                                <img
                                  src="assets/image/content/google-app-setup.png"
                                  style={{ objectFit: "contain" }}
                                  alt=""
                                />
                              </div>
                              <div>
                                <img
                                  src="assets/image/content/add-email-config.png"
                                  style={{ objectFit: "contain" }}
                                />
                              </div>

                              <div>
                                <img
                                  src="assets/image/content/profile-hide.png"
                                  style={{ objectFit: "contain" }}
                                />
                              </div>
                              <div>
                                <img
                                  src="assets/image/content/step-verification.png"
                                  style={{ objectFit: "contain" }}
                                />
                              </div>
                              <div>
                                <img
                                  src="assets/image/content/open-app-password.png"
                                  style={{ objectFit: "contain" }}
                                />
                              </div>

                              <div>
                                <img
                                  src="assets/image/content/passcode.png"
                                  style={{ objectFit: "contain" }}
                                />
                              </div>
                              <div>
                                <img
                                  src="assets/image/content/paste-password.png"
                                  style={{ objectFit: "contain" }}
                                />
                              </div>
                              <div>
                                <img
                                  src="assets/image/content/port-img.png"
                                  style={{ objectFit: "contain" }}
                                />
                              </div>
                              <div>
                                <img
                                  src="assets/image/content/email-save.png"
                                  style={{ objectFit: "contain" }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* -------------------ends here */}

                    <h2 className="mt-5">Logo Settings</h2>
                    <ul
                      className="nav nav-tabs mt-3"
                      id="logoTab"
                      role="tablist"
                    >
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link active"
                          id="logo-preview-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#logo-preview"
                          type="button"
                          role="tab"
                          aria-controls="logo-preview"
                          aria-selected="true"
                        >
                          <i className="ri-eye-line"></i>Preview
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link"
                          id="logo-usage-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#logo-usage"
                          type="button"
                          role="tab"
                          aria-controls="logo-usage"
                          aria-selected="false"
                        >
                          <span className="material-symbols-outlined">
                            build
                          </span>
                          Usage
                        </button>
                      </li>
                      <li className="nav-item" role="presentation">
                        <button
                          className="nav-link"
                          id="logo-how-tab"
                          data-bs-toggle="tab"
                          data-bs-target="#logo-how"
                          type="button"
                          role="tab"
                          aria-controls="logo-how"
                          aria-selected="false"
                        >
                          <span className="material-symbols-outlined">
                            menu_book
                          </span>
                          How to Use
                        </button>
                      </li>
                    </ul>

                    <div
                      className="tab-content second-content"
                      id="logoTabContent"
                    >
                      <div
                        className="tab-pane fade show active"
                        id="logo-preview"
                        role="tabpanel"
                        aria-labelledby="logo-preview-tab"
                      >
                        <img
                          src="./assets/image/content/logo-setting-img.png"
                          alt="Logo Settings Preview"
                        />
                      </div>
                      {/*✅ 6. Logo Settings Section */}
                      <div
                        className="tab-pane fade"
                        id="logo-usage"
                        role="tabpanel"
                        aria-labelledby="logo-usage-tab"
                      >
                        <p>
                          <strong>What it is:</strong>
                        </p>
                        <p>
                          The <strong>Logo Settings</strong> section allows you
                          to manage your system’s branding by uploading logos
                          for both <strong>Light Mode</strong> and{" "}
                          <strong>Dark Mode</strong>. Your uploaded logo will be
                          displayed above the sidebar menu for consistent brand
                          visibility.
                        </p>
                        <p>
                          <strong>Description:</strong>
                        </p>
                        <ul className="lists">
                          <li>
                            Upload different logos for{" "}
                            <strong>Light Mode</strong> and{" "}
                            <strong>Dark Mode</strong> to match the system
                            theme.
                          </li>
                          <li>
                            Supports <strong>drag-and-drop</strong> or{" "}
                            <strong>click-to-upload</strong> functionality for
                            easy logo management.
                          </li>
                          <li>
                            Helps maintain <strong>consistent</strong> and{" "}
                            <strong>professional branding</strong>
                            across the entire application interface.
                          </li>
                        </ul>
                      </div>
                      <div
                        className="tab-pane fade how-to-use  "
                        id="logo-how"
                        role="tabpanel"
                        aria-labelledby="logo-how-tab"
                      >
                        <div className="d-md-flex justify-content-md-between col-9 ">
                          <div className="col-12 col-md-11 col-lg-7 pb-lg-5">
                            <p>
                              <strong>How to Use It:</strong>
                            </p>
                            <ul className="lists steps ">
                              <li
                                data-target="4"
                                className="cursor-pointer mb-4"
                              >
                                Open the <strong>Logo Settings </strong>
                                subsection.
                                <div>
                                  <img
                                    src="./assets/image/content/logo-setting-img.png"
                                    className="mobile-step-img"
                                    style={{ objectFit: "contain" }}
                                  />
                                </div>
                              </li>
                              <li
                                data-target="2"
                                className="cursor-pointer mb-4"
                              >
                                Click inside the upload box to select a logo
                                from your device or drag and drop it directly.
                                <div>
                                  <img
                                    src="assets/image/content/dragbox.png"
                                    className="mobile-step-img"
                                    style={{ objectFit: "contain" }}
                                  />
                                </div>
                              </li>
                              <li
                                data-target="3"
                                className="cursor-pointer mb-4"
                              >
                                Upload <strong>separate logos</strong> for
                                <strong> Light Mode</strong> and{" "}
                                <strong>Dark Mode</strong>.
                                <div>
                                  <img
                                    src="assets/image/content/LightDark.png"
                                    className="mobile-step-img"
                                    style={{ objectFit: "contain" }}
                                  />
                                </div>
                              </li>
                              <li
                                data-target="1"
                                className="cursor-pointer mb-4"
                              >
                                Click <strong>Save Changes</strong> to apply
                                your logos across the system interface.
                                <div>
                                  <img
                                    src="assets/image/content/Save Changes.png"
                                    className="mobile-step-img"
                                    style={{ objectFit: "contain" }}
                                  />
                                </div>
                              </li>
                            </ul>
                          </div>
                          <div className="col-4">
                            <div className="stack ">
                              <div>
                                <img
                                  src="assets/image/content/Save Changes.png"
                                  style={{ objectFit: "contain" }}
                                />
                              </div>
                              <div>
                                <img
                                  src="assets/image/content/dragbox.png"
                                  style={{ objectFit: "contain" }}
                                  alt=""
                                />
                              </div>
                              <div>
                                <img
                                  src="assets/image/content/LightDark.png"
                                  style={{ objectFit: "contain" }}
                                  alt=""
                                />
                              </div>
                              <div>
                                <img
                                  src="assets/image/content/logo-setting-img.png"
                                  style={{ objectFit: "contain" }}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/*Profile Menu */}

              <div className="gx-block" id="file_ProfileManage">
                <div className="gx-card gx-page-block">
                  <div className="gx-card-header">
                    <p className="second-main-title"> Profile Menu</p>
                    <div className="header-tools">
                      <a href="#" className="gx-full-card">
                        <i className="ri-fullscreen-fill"></i>
                      </a>
                    </div>
                  </div>
                  <div className="gx-card-content">
                    <div className="intero">
                      <h1>Profile Menu:</h1>
                      <p className="popins-data-helpex">
                        The <strong>Profile Menu</strong> gives you quick access
                        to your account details and management options. It
                        displays your name and email, and provides options to
                        view your profile, update account settings, change your
                        password, or log out.
                      </p>

                      <h2 className="mt-4">My Profile:</h2>
                      <ul
                        className="nav nav-tabs mt-3"
                        id="profileTab"
                        role="tablist"
                      >
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link active"
                            id="profile-preview-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#profile-preview"
                            type="button"
                            role="tab"
                            aria-controls="profile-preview"
                            aria-selected="true"
                          >
                            <i className="ri-eye-line"></i>Preview
                          </button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link"
                            id="profile-usage-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#profile-usage"
                            type="button"
                            role="tab"
                            aria-controls="profile-usage"
                            aria-selected="false"
                          >
                            <span className="material-symbols-outlined">
                              build
                            </span>
                            Usage
                          </button>
                        </li>
                        {/*<li className="nav-item" role="presentation">
        <button className="nav-link" id="profile-how-tab" data-bs-toggle="tab"
          data-bs-target="#profile-how" type="button" role="tab"
          aria-controls="profile-how" aria-selected="false">
          <span className="material-symbols-outlined">menu_book</span>How to Use
        </button>
      </li> */}
                      </ul>

                      <div
                        className="tab-content second-content"
                        id="profileTabContent"
                      >
                        <div
                          className="tab-pane fade show active"
                          id="profile-preview"
                          role="tabpanel"
                          aria-labelledby="profile-preview-tab"
                        >
                          <img
                            src="./assets/image/content/profile-img.png"
                            alt="Profile Preview"
                          />
                        </div>
                        <div
                          className="tab-pane fade"
                          id="profile-usage"
                          role="tabpanel"
                          aria-labelledby="profile-usage-tab"
                        >
                          <p>
                            <strong>What it is:</strong>
                          </p>
                          <p>
                            The My Profile section lets you easily view all your
                            personal account information in one place. It helps
                            you verify and access your profile details,
                            including contact information, location, and
                            platform activity.
                          </p>

                          <p>
                            <strong>Description:</strong>
                          </p>
                          <ul className="lists">
                            <li>
                              <strong>Profile Overview:</strong> Shows your
                              profile picture, first name, email, location, and
                              the date you joined the platform.
                            </li>
                            <li>
                              <strong>About Section:</strong> Displays your full
                              name, gender, date of birth, and country.
                            </li>
                            <li>
                              <strong>Contact Section:</strong> Lists your
                              contact number and email address for quick
                              reference.
                            </li>
                          </ul>
                        </div>

                        {/*<div className="tab-pane fade" id="profile-how" role="tabpanel" aria-labelledby="profile-how-tab">
 <div className="d-md-flex justify-content-md-between col-md-10 col-11  ">
    <div className="col-12 col-md-11 col-lg-7  ">
  <p><strong>How to Use It:</strong></p>
  <ul className="lists steps">
    <li data-target="5" className="cursor-pointer mb-2">Open the <strong>Email Templates</strong> section from the menu.
    <div><img src="assets/image/content/email.png" className="mobile-step-img" style={{"objectFit": "contain"}} /></div>
    </li>
    <li  data-target="2" className="cursor-pointer  mb-2">Use the <strong>Search bar</strong> to find a specific template or scroll through the list to browse all available ones.
      <div><img src="assets/image/content/emailSearch.png" className="mobile-step-img" style={{"objectFit": "contain"}} /></div>
    </li>
    <li  data-target="3" className="cursor-pointer  mb-2">Click the <strong>Edit icon</strong> under the <strong>Actions</strong> column to modify the template’s <strong>Subject</strong> or <strong>Body</strong>.
    <div><img src="assets/image/content/templateAction.png" className="mobile-step-img" style={{"objectFit": "contain"}} /></div>
    </li>
    <li  data-target="4" className="cursor-pointer  mb-2">Insert dynamic placeholders from the right panel (e.g., {name}, {date-time}, {doctor-name}) to personalize messages.
      <div><img src="assets/image/content/tempDetails.png" className="mobile-step-img" style={{"objectFit": "contain"}} /></div>
    </li>
    <li  data-target="1" className="cursor-pointer  mb-2">Click <strong>Preview & Save</strong> to review and confirm your updates.

    <div><img src="assets/image/content/Preview & Save.png" className="mobile-step-img" style={{"objectFit": "contain"}} /></div>
    </li>
  </ul>
</div>
  <div className="col-4 ">
  <div className="stack ">
    <div><img src="assets/image/content/Preview & Save.png" style={{"objectFit": "contain"}} ></div>
    <div><img src="assets/image/content/emailSearch.png" style={{"objectFit": "contain"}}  alt="" /></div>
    <div><img src="assets/image/content/templateAction.png" style={{"objectFit": "contain"}} alt="" /></div>
    <div><img src="assets/image/content/tempDetails.png" style={{"objectFit": "contain"}} ></div>
    <div><img src="assets/image/content/email.png" style={{"objectFit": "contain"}} alt="" /></div>
   
  </div>
    </div>
<div>

</div>
  </div>
</div> */}
                      </div>

                      <h2 className="mt-5">Account Settings:</h2>
                      <ul
                        className="nav nav-tabs mt-3"
                        id="accountsettingTab"
                        role="tablist"
                      >
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link active"
                            id="whatsapp-preview-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#accountsetting-preview"
                            type="button"
                            role="tab"
                            aria-controls="accountsetting-preview"
                            aria-selected="true"
                          >
                            <i className="ri-eye-line"></i>Preview
                          </button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link"
                            id="accountsetting-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#accountsetting-usage"
                            type="button"
                            role="tab"
                            aria-controls="accountsetting-usage"
                            aria-selected="false"
                          >
                            <span className="material-symbols-outlined">
                              build
                            </span>
                            Usage
                          </button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link"
                            id="accountsetting-how-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#accountsetting-how"
                            type="button"
                            role="tab"
                            aria-controls="accountsetting-how"
                            aria-selected="false"
                          >
                            <span className="material-symbols-outlined">
                              menu_book
                            </span>
                            How to Use
                          </button>
                        </li>
                      </ul>

                      <div
                        className="tab-content second-content"
                        id="accountsettingTabContent"
                      >
                        <div
                          className="tab-pane fade show active"
                          id="accountsetting-preview"
                          role="tabpanel"
                          aria-labelledby="accountsetting-preview-tab"
                        >
                          <img
                            src="./assets/image/content/account-settings-img.png"
                            alt="accountsetting Preview"
                          />
                        </div>
                        <div
                          className="tab-pane fade"
                          id="accountsetting-usage"
                          role="tabpanel"
                          aria-labelledby="accountsetting-usage-tab"
                        >
                          <p>
                            <strong>What it is:</strong>
                          </p>
                          <p>
                            The Account Settings section allows you to view and
                            update both your personal and business account
                            information. It helps you manage profile details,
                            business information, uploaded documents, and
                            account removal in a single location.
                          </p>

                          <p>
                            <strong>Description:</strong>
                          </p>
                          <ul className="lists">
                            <li>
                              <strong>Personal Information:</strong> Edit
                              profile image, first name, last name, email,
                              country, gender, date of birth, and contact
                              number.
                            </li>
                            <li>
                              <strong>Business Details:</strong> Update center
                              name, physical address, business trade name,
                              business address, business country and city,
                              primary email, and primary contact number.
                            </li>
                            {/* <li>
                              <strong>Document Uploads:</strong> View and upload
                              important documents such as trade license, ID of
                              the responsible person, and signed contract.
                            </li> */}
                            <li>
                              <strong>Delete Account:</strong> Permanently
                              remove your account and all associated data from
                              the platform.
                            </li>
                          </ul>
                        </div>

                        <div
                          className="tab-pane fade"
                          id="accountsetting-how"
                          role="tabpanel"
                          aria-labelledby="accountsetting-how-tab"
                        >
                          <div className="d-md-flex justify-content-md-between col-md-10 col-11  ">
                            <div className="col-12 col-md-11 col-lg-7  ">
                              <p>
                                <strong>How to Use It:</strong>
                              </p>
                              <ul className="lists steps ">
                                <li
                                  data-target="11"
                                  className="cursor-pointer mb-4"
                                >
                                  Open the <strong>Account Settings</strong>{" "}
                                  section from the Profile Menu.
                                  <div>
                                    <img
                                      src="assets/image/content/account-setting-btn.PNG"
                                      className="mobile-step-img"
                                      style={{ objectFit: "contain" }}
                                    />
                                  </div>
                                </li>
                                <li>
                                  Update Profile Image
                                  <ul>
                                    <li
                                      data-target="7"
                                      className="cursor-pointer"
                                    >
                                      Click Upload New Image to change your
                                      profile picture.
                                      <div>
                                        <img
                                          src="assets/image/content/upload-new-pic.PNG"
                                          className="mobile-step-img"
                                          style={{ objectFit: "contain" }}
                                        />
                                      </div>
                                    </li>
                                    <li
                                      data-target="5"
                                      className="cursor-pointer"
                                    >
                                      If you uploaded the wrong image, click
                                      Reset to revert to the previous image.
                                      <div>
                                        <img
                                          src="assets/image/content/reset-pic.PNG"
                                          className="mobile-step-img"
                                          style={{ objectFit: "contain" }}
                                        />
                                      </div>
                                    </li>
                                    <li
                                      data-target="7"
                                      className="cursor-pointer"
                                    >
                                      You can also add a new image if none was
                                      added during profile creation.
                                      <div>
                                        <img
                                          src="assets/image/content/upload-new-pic.PNG"
                                          className="mobile-step-img"
                                          style={{ objectFit: "contain" }}
                                        />
                                      </div>
                                    </li>
                                  </ul>
                                </li>
                                <li>
                                  <strong>
                                    Edit Personal or Business Details
                                  </strong>

                                  <ul>
                                    <li
                                      data-target="6"
                                      className="cursor-pointer"
                                    >
                                      Click on any field you want to update and
                                      enter the correct information.
                                      <div>
                                        <img
                                          src="assets/image/content/edit-information.PNG"
                                          className="mobile-step-img"
                                          style={{ objectFit: "contain" }}
                                        />
                                      </div>
                                    </li>
                                    <li
                                      data-target="5"
                                      className="cursor-pointer"
                                    >
                                      If you make a mistake or want to discard
                                      changes before saving, click
                                      <strong>Reset</strong> next to the Save
                                      button.
                                      <div>
                                        <img
                                          src="assets/image/content/reset-pic.PNG"
                                          className="mobile-step-img"
                                          style={{ objectFit: "contain" }}
                                        />
                                      </div>
                                    </li>
                                    <li
                                      data-target="3"
                                      className="cursor-pointer"
                                    >
                                      Once all changes are correct, click{" "}
                                      <strong>Save</strong> to update your
                                      profile.
                                      <div>
                                        <img
                                          src="assets/image/content/Save.png"
                                          className="mobile-step-img"
                                          style={{ objectFit: "contain" }}
                                        />
                                      </div>
                                    </li>
                                  </ul>
                                </li>

                                {/* <strong>Manage Uploaded Documents</strong> */}

                                {/* <li
                                      data-target="10"
                                      className="cursor-pointer"
                                    >
                                      Upload or replace important documents such
                                      as trade license, ID of the responsible
                                      person, or signed contract.
                                      <div>
                                        <img
                                          src="assets/image/content/uploadreplace.PNG"
                                          className="mobile-step-img"
                                          style={{ objectFit: "contain" }}
                                        /> */}
                                {/* </div> */}

                                <strong>
                                  Ensure that no required field is left blank,
                                  as the system will not save incomplete
                                  updates.
                                </strong>

                                <li>
                                  <strong>Delete Account Permanently</strong>
                                  <ul>
                                    <li
                                      data-target="9"
                                      className="cursor-pointer"
                                    >
                                      Click <strong>Delete My Account</strong>.
                                      <div>
                                        <img
                                          src="assets/image/content/del-my-account.PNG"
                                          className="mobile-step-img"
                                          style={{ objectFit: "contain" }}
                                        />
                                      </div>
                                    </li>
                                    <li
                                      data-target="2"
                                      className="cursor-pointer"
                                    >
                                      A confirmation box will appear asking for
                                      your <strong>password</strong>,
                                      <strong>confirm password</strong>, and for
                                      you to type
                                      <strong>DELETE_MY_DATA</strong> in all
                                      caps.
                                      <div>
                                        <img
                                          src="assets/image/content/del-acc-confirm.PNG"
                                          className="mobile-step-img"
                                          style={{ objectFit: "contain" }}
                                        />
                                      </div>
                                    </li>
                                    <li
                                      data-target="4"
                                      className="cursor-pointer"
                                    >
                                      Click <strong>Delete Account</strong> to
                                      permanently remove your account and all
                                      associated data.
                                      <div>
                                        <img
                                          src="assets/image/content/del-btn.PNG"
                                          className="mobile-step-img"
                                          style={{ objectFit: "contain" }}
                                        />
                                      </div>
                                    </li>
                                    <li
                                      data-target="1"
                                      className="cursor-pointer"
                                    >
                                      If you change your mind, click
                                      <strong>Cancel</strong> to exit without
                                      deleting your account.
                                      <div>
                                        <img
                                          src="assets/image/content/cencel-btn.PNG"
                                          className="mobile-step-img"
                                          style={{ objectFit: "contain" }}
                                        />
                                      </div>
                                    </li>
                                  </ul>
                                </li>
                              </ul>
                            </div>
                            <div className="col-4 ">
                              <div className="stack ">
                                <div>
                                  <img
                                    src="assets/image/content/cencel-btn.PNG "
                                    style={{ objectFit: "contain" }}
                                  />
                                </div>
                                <div>
                                  <img
                                    src="assets/image/content/del-acc-confirm.PNG"
                                    style={{ objectFit: "contain" }}
                                    alt=""
                                  />
                                </div>
                                <div>
                                  <img
                                    src="assets/image/content/Save.png"
                                    style={{ objectFit: "contain" }}
                                    alt=""
                                  />
                                </div>
                                <div>
                                  <img
                                    src="assets/image/content/del-btn.PNG"
                                    style={{ objectFit: "contain" }}
                                  />
                                </div>
                                <div>
                                  <img
                                    src="assets/image/content/reset-pic.PNG"
                                    style={{ objectFit: "contain" }}
                                  />
                                </div>
                                <div>
                                  <img
                                    src="assets/image/content/edit-information.PNG"
                                    style={{ objectFit: "contain" }}
                                  />
                                </div>
                                <div>
                                  <img
                                    src="assets/image/content/upload-new-pic.PNG"
                                    style={{ objectFit: "contain" }}
                                  />
                                </div>
                                <div>
                                  <img
                                    src="assets/image/content/account-setting-btn.PNG"
                                    style={{ objectFit: "contain" }}
                                  />
                                </div>
                                <div>
                                  <img
                                    src="assets/image/content/del-my-account.PNG"
                                    style={{ objectFit: "contain" }}
                                  />
                                </div>
                                <div>
                                  <img
                                    src="assets/image/content/uploadreplace.PNG"
                                    style={{ objectFit: "contain" }}
                                  />
                                </div>
                                <div>
                                  <img
                                    src="assets/image/content/account-setting-btn.PNG"
                                    style={{ objectFit: "contain" }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <h2 className="mt-5">Change Password:</h2>
                      <ul
                        className="nav nav-tabs mt-3"
                        id="changepasswordTab"
                        role="tablist"
                      >
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link active"
                            id="changepassword-preview-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#changepassword-preview"
                            type="button"
                            role="tab"
                            aria-controls="changepassword-preview"
                            aria-selected="true"
                          >
                            <i className="ri-eye-line"></i>Preview
                          </button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link"
                            id="changepassword-usage-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#changepassword-usage"
                            type="button"
                            role="tab"
                            aria-controls="changepassword-usage"
                            aria-selected="false"
                          >
                            <span className="material-symbols-outlined">
                              build
                            </span>
                            Usage
                          </button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button
                            className="nav-link"
                            id="changepassword-how-tab"
                            data-bs-toggle="tab"
                            data-bs-target="#changepassword-how"
                            type="button"
                            role="tab"
                            aria-controls="changepassword-how"
                            aria-selected="false"
                          >
                            <span className="material-symbols-outlined">
                              menu_book
                            </span>
                            How to Use
                          </button>
                        </li>
                      </ul>

                      <div
                        className="tab-content second-content"
                        id="changepasswordTabContent"
                      >
                        <div
                          className="tab-pane fade show active"
                          id="changepassword-preview"
                          role="tabpanel"
                          aria-labelledby="changepassword-preview-tab"
                        >
                          <img
                            src="./assets/image/content/change-password-img.png"
                            alt="change password Preview"
                          />
                        </div>
                        <div
                          className="tab-pane fade"
                          id="changepassword-usage"
                          role="tabpanel"
                          aria-labelledby="changepassword-usage-tab"
                        >
                          <p>
                            <strong>What it is:</strong>
                          </p>
                          <p>
                            The Change Password section allows you to securely
                            update the password associated with your account. It
                            helps protect your account by ensuring only you can
                            access it.
                          </p>

                          <p>
                            <strong>Description:</strong>
                          </p>
                          <ul className="lists">
                            <li>
                              <strong>Current Password:</strong> Enter your
                              existing password to verify your identity.
                            </li>
                            <li>
                              <strong>New Password:</strong> Set a new password
                              for your account.
                            </li>
                            <li>
                              <strong>Confirm Password:</strong> Re-enter the
                              new password to confirm accuracy.
                            </li>
                            <li>
                              <strong>Save Changes:</strong> Apply the new
                              password to your account securely.
                            </li>
                          </ul>
                        </div>

                        <div
                          className="tab-pane fade"
                          id="changepassword-how"
                          role="tabpanel"
                          aria-labelledby="changepassword-how-tab"
                        >
                          <div className="d-md-flex justify-content-md-between col-md-10 col-11  ">
                            <div className="col-12 col-md-11 col-lg-7  ">
                              <p>
                                <strong>How to Use It:</strong>
                              </p>
                              <ul className="lists steps  ">
                                <li
                                  data-target="6"
                                  className="cursor-pointer mb-4"
                                >
                                  Open the <strong>Change Password</strong>{" "}
                                  section from the Profile Menu.
                                  <div>
                                    <img
                                      src="assets/image/content/change-pass-btn.PNG"
                                      className="mobile-step-img"
                                      style={{ objectFit: "contain" }}
                                    />
                                  </div>
                                </li>
                                <li
                                  data-target="1"
                                  className="cursor-pointer  mb-4"
                                >
                                  <strong>Enter Current Password:</strong> Type
                                  your existing password to verify your
                                  identity.
                                  <div>
                                    <img
                                      src="assets/image/content/current-pass.PNG"
                                      className="mobile-step-img"
                                      style={{ objectFit: "contain" }}
                                    />
                                  </div>
                                </li>
                                <li
                                  data-target="2"
                                  className="cursor-pointer  mb-4"
                                >
                                  <strong>Set New Password:</strong>
                                  Enter your desired new password. Make sure it
                                  meets the platform’s security requirements
                                  (minimum length of 8 characters, combination
                                  of small n capital letters, numbers, or
                                  symbols).
                                  <div>
                                    <img
                                      src="assets/image/content/new-pass.PNG"
                                      className="mobile-step-img"
                                      style={{ objectFit: "contain" }}
                                    />
                                  </div>
                                </li>
                                <li
                                  data-target="4"
                                  className="cursor-pointer mb-4"
                                >
                                  <strong>Confirm New Password:</strong>
                                  Re-enter the new password to ensure it matches
                                  exactly.
                                  <div>
                                    <img
                                      src="assets/image/content/confirm-new-pas.PNG"
                                      className="mobile-step-img"
                                      style={{ objectFit: "contain" }}
                                    />
                                  </div>
                                </li>
                                <li
                                  data-target="3"
                                  className="cursor-pointer  mb-4"
                                >
                                  <strong>Save Changes:</strong> Click Save
                                  Changes to update your password. Your account
                                  will now be secured with the new password.
                                  <div>
                                    <img
                                      src="assets/image/content/Save Changes.png"
                                      className="mobile-step-img"
                                      style={{ objectFit: "contain" }}
                                    />
                                  </div>
                                </li>
                                <li
                                  data-target="5"
                                  className="cursor-pointer  mb-4"
                                >
                                  <strong>Reset:</strong> If you made a mistake
                                  or changed your mind, click{" "}
                                  <strong>Reset</strong> to clear the fields or
                                  exit without updating your password.
                                  <div>
                                    <img
                                      src="assets/image/content/reset-pas.PNG"
                                      className="mobile-step-img"
                                      style={{ objectFit: "contain" }}
                                    />
                                  </div>
                                </li>
                              </ul>
                            </div>
                            <div className="col-4">
                              <div className="stack ">
                                <div>
                                  <img
                                    src="assets/image/content/current-pass.PNG"
                                    style={{ objectFit: "contain" }}
                                    alt=""
                                  />
                                </div>
                                <div>
                                  <img
                                    src="assets/image/content/new-pass.PNG"
                                    style={{ objectFit: "contain" }}
                                    alt=""
                                  />
                                </div>
                                <div>
                                  <img
                                    src="assets/image/content/Save Changes.png "
                                    style={{ objectFit: "contain" }}
                                  />
                                </div>
                                <div>
                                  <img
                                    src="assets/image/content/confirm-new-pas.PNG "
                                    style={{ objectFit: "contain" }}
                                  />
                                </div>
                                <div>
                                  <img
                                    src="assets/image/content/reset-pas.PNG "
                                    style={{ objectFit: "contain" }}
                                  />
                                </div>
                                <div>
                                  <img
                                    src="assets/image/content/change-pass-btn.PNG "
                                    style={{ objectFit: "contain" }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
