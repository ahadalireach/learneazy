/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import {
  CoursePreviewDetails,
  Footer,
  Header,
  Loader,
  PageHead,
} from "@/app/components";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { loadStripe } from "@stripe/stripe-js";
import { useLoadUserQuery } from "@/redux/features/api/apiSlice";
import { useGetPublicCoursePreviewQuery } from "@/redux/features/courses/coursesApi";
import {
  useCreatePaymentIntentMutation,
  useGetStripePublishablekeyQuery,
} from "@/redux/features/order/orderApi";

const Page = () => {
  const params = useParams();
  const courseId = params.id as string;
  const [open, setOpen] = useState(false);
  const [route, setRoute] = useState("Login");
  const [clientSecret, setClientSecret] = useState("");
  const [stripePromise, setStripePromise] = useState<any>(null);
  const { data: userData } = useLoadUserQuery(undefined, {});
  const { data: config } = useGetStripePublishablekeyQuery({});
  const { data, isLoading } = useGetPublicCoursePreviewQuery(courseId);
  const [createPaymentIntent, { data: paymentIntentData }] =
    useCreatePaymentIntentMutation();

  useEffect(() => {
    if (config) {
      const publishablekey = config?.publishablekey;
      setStripePromise(loadStripe(publishablekey));
    }
    if (data && userData?.user) {
      const amount = Math.round(data.course.price * 100);
      createPaymentIntent(amount);
    }
  }, [config, data, userData]);

  useEffect(() => {
    if (paymentIntentData) {
      setClientSecret(paymentIntentData?.clientSecret);
    }
  }, [paymentIntentData]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <PageHead
            title={`Learneazy - ${data?.title} | Course Details`}
            description={data?.description}
            keywords={`${data?.title}, Course Details, Ahad Ali LMS, Ahad Ali Project`}
          />
          <Header
            route={route}
            setRoute={setRoute}
            open={open}
            setOpen={setOpen}
            activeItem={1}
          />
          {stripePromise && (
            <div className="pt-[80px]">
              <CoursePreviewDetails
                data={data?.course}
                setOpen={setOpen}
                setRoute={setRoute}
                clientSecret={clientSecret}
                stripePromise={stripePromise}
              />
            </div>
          )}
          <Footer />
        </>
      )}
    </>
  );
};

export default Page;
