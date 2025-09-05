import { useEffect, useState } from "react";

import axios from "../lib/axios";

import { frontendurl, websiteurl } from "@/constants/myapi";
import { useDateAccount } from "@/context/DateAccountContextProvider";

const ApthProvider = () => {
  const { apiAccessToken } = useDateAccount();
  const queryParameters = new URLSearchParams(window.location.search);
  const user_id = queryParameters.get("user_id") || "";
  const user_email = queryParameters.get("user_email") || "";
  const user_name = queryParameters.get("user_name") || "";
  const [Success_Step, setSuccess_Step] = useState(null);
  const [MembershipPlan, setMembershipPlan] = useState(null);

  const checkProgress = async () => {
    const Success_step_response = await axios.post(
      `get_success_step_of_user/`,
      { user_id: user_id },
    );

    if (Success_step_response.data) {
      // alert(Success_step_response.data?.success_step)
      setSuccess_Step(Success_step_response.data?.success_step);
      setMembershipPlan(Success_step_response.data?.Subscription_Product_name);
    }
  };

  useEffect(() => {
    checkProgress();
  }, []);

  const checkUserValidation = async () => {
    if (user_id) {
      const response = await axios.get(`validate_user_id/?user_id=${user_id}`, {
        headers: { Authorization: `Bearer ${1234}` },
      });

      if (response.data?.status === 1) {
        console.log("response.data.status: ", response.data.status);
        localStorage.setItem("user_id", user_id);
        localStorage.setItem("user_name", user_name);
        localStorage.setItem("user_email", user_email);

        // ================================================================================================
        // const Success_step_response = await axios.post(`get_success_step_of_user/`, { user_id: user_id })
        // console.log("Success_step_response: ============================================================================", Success_step_response.data)
        // alert(Success_step_response.data?.success_step)
        // if (Success_step_response.data?.success_step < 2) {
        //   window.location.replace(`${frontendurl()}Setup-Page`)
        //   // alert("Not Completed Step 1")
        // } else {
        //   if (Success_step_response.data?.Subscription_Product_name !== null && Success_step_response.data?.success_step < 3) {
        //     // alert("Step.3 is not completed")
        //     window.location.replace(`${frontendurl()}Setup-Page`)
        //   } else {
        //     // alert("You have already completed the setup process.")
        //     window.location.replace(`${frontendurl()}`)

        //   }
        // }
        // ============================================================================================
        if (
          MembershipPlan === null ||
          MembershipPlan === "null" ||
          MembershipPlan === "None"
        ) {
          // alert("You have not any plan.")
          window.location.replace(`${frontendurl()}`);
        } else {
          if (Success_Step && Success_Step < 5) {
            // alert("You have not completed the setup process.")
            window.location.replace(`${frontendurl()}initial-setup`);
          } else {
            // alert("Going to the home page")
            window.location.replace(`${frontendurl()}`);
          }
        }
      } else {
        if (!localStorage.getItem("user_id")) {
          window.location.replace(`${websiteurl()}`);
        }
      }
    }
  };

  useEffect(() => {
    if (Success_Step === null) return;
    checkUserValidation();
  }, [user_id, apiAccessToken, Success_Step, MembershipPlan]);

  return <></>;
};

export default ApthProvider;
