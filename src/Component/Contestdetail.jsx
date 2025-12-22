import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { FaClock, FaLock, FaUserFriends } from "react-icons/fa";
import { useParams } from "react-router";
import Swal from "sweetalert2";
import Useaxiossecure from "../Hooks/Useaxiossecure";
import { useCountdown } from "../Hooks/Usecountdown";
import Userole from "../Hooks/Userole";
import { useForm } from "react-hook-form";

const Contestdetail = () => {
  const { register, handleSubmit } = useForm();
  const queryClient = useQueryClient();
  const { Dbuser } = Userole();
  const { id } = useParams();
  const axiossecure = Useaxiossecure();

 
  const { data: contestdetail, isLoading } = useQuery({
    queryKey: ["contestdetail", id],
    enabled: Boolean(id),
    queryFn: async () => {
      const result = await axiossecure.get(`/contest/detail/${id}`);
      return result.data;
    },
  });

  const detail = contestdetail?.[0];

 
 const {
  data: paymentstatus,
  isLoading: paymentloading,
} = useQuery({
  queryKey: ["paymentstatus", id, Dbuser?.email],
  enabled: Boolean(id) && Boolean(Dbuser?.email),
  queryFn: async () => {
    const result = await axiossecure.get(
      `/payments/status?contestid=${id}`
    );
    return result.data;
  },
  staleTime: 0,
  refetchOnMount: "always",
  refetchOnWindowFocus: true,
});


  
  const { data: submited, isLoading: sumbitload } = useQuery({
    queryKey: ["submitedornot", id],
    enabled: Boolean(id) && Boolean(Dbuser?.email),
    queryFn: async () => {
      const result = await axiossecure.get(
        `/submitedornot?contestid=${id}`
      );
      return result.data;
    },
  });

 
  const { data: winnerphoto } = useQuery({
    queryKey: ["winnerphoto", detail?.winnerUserId],
    enabled: Boolean(detail?.winnerUserId),
    queryFn: async () => {
      const result = await axiossecure.get(
        `/winneruserid/${detail.winnerUserId}`
      );
      return result.data;
    },
  });

  const countdown = useCountdown(detail?.deadline);


  const { mutate: sumittask } = useMutation({
    mutationFn: async () => {
      const result = await axiossecure.post("/create-checkout-session", {
        contestId: detail._id,
      });
      return result.data;
    },
    onSuccess: (data) => {
      window.location.href = data.url;
    },
    onError: (err) => {
      Swal.fire(
        "Error",
        err.response?.data?.message || "Something went wrong",
        "error"
      );
    },
  });


  const { mutate: sumitorm } = useMutation({
    mutationFn: async (formData) => {
      const payload = {
        submissionText: formData.Submiteddata,
        contestid: detail._id,
        name: Dbuser.name,
        contestname: detail.name,
        prizemoney: detail.prizeMoney,
      };
      const result = await axiossecure.post("/submittask", payload);
      return result.data;
    },
    onSuccess: () => {
      document.getElementById("my_modal_5").close();
      queryClient.invalidateQueries(["submitedornot"]);
      Swal.fire("Success", "Submission done", "success");
    },
  });

  const handlesubmitform = (data) => {
    sumitorm(data);
  };

 
  if (isLoading || paymentloading || sumbitload) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <span className="loading loading-spinner text-sky-400 w-16 h-16"></span>
      </div>
    );
  }


const isPaid = paymentstatus?.hasPaid === true;
  const isSubmitted = submited?.issubmited === true;

 
  return (
    <>
      <div className="my-10 flex justify-center p-6">
        <div className="w-full max-w-5xl bg-base-100 rounded-3xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">

            {/* Image */}
            <div className="bg-gray-50 rounded-2xl flex items-center justify-center p-6">
              <img
                src={detail.photoo}
                alt="Contest"
                className="w-full max-h-[320px] object-contain"
              />
            </div>

            {/* Info */}
            <div className="flex flex-col gap-5">
              <h1 className="text-2xl font-bold">{detail.name}</h1>

              <div className="flex gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <FaUserFriends /> {detail.participantsCount}
                </span>
                <span className="flex items-center gap-1">
                  <FaClock />
                  {!countdown?.expired ? (
                    <span className="font-bold text-blue-500">
                      {countdown.days}d {countdown.hours}h{" "}
                      {countdown.minutes}m {countdown.seconds}s
                    </span>
                  ) : (
                    <span className="text-red-500">Contest Ended</span>
                  )}
                </span>
              </div>

              <div className="font-bold">
                Entry Fee: {detail.price} <br />
                <span className="text-blue-500">
                  Prize Money: {detail.prizeMoney}
                </span>
              </div>

              <p>{detail.description}</p>
              <p>
                <strong>Task:</strong> {detail.taskInstruction}
              </p>

              {!countdown?.expired && (
                <>
               {!isPaid && (
  <button
    onClick={() => sumittask()}
    className="w-full h-12 rounded-xl bg-blue-500 hover:bg-blue-600 text-white font-medium shadow"
  >
    Register / Pay
  </button>
)}


                  {isPaid && !isSubmitted && (
                    <button
                      onClick={() =>
                        document.getElementById("my_modal_5").showModal()
                      }
                      className="btn btn-outline btn-primary"
                    >
                      Submit Task
                    </button>
                  )}

                  {isPaid && isSubmitted && (
                    <button disabled className="btn btn-disabled">
                      Submitted
                    </button>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Winner */}
          <div className="bg-gray-50 px-6 py-5">
            <h2 className="font-semibold mb-2">Winner</h2>
            <div className="flex items-center gap-3 text-gray-500">
              {detail.winnerUserId ? (
                <>
                  {winnerphoto?.photoURL ? (
                    <div
                      className="w-12 h-12 rounded-full bg-cover"
                      style={{
                        backgroundImage: `url('${winnerphoto.photoURL}')`,
                      }}
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                      <FaLock />
                    </div>
                  )}
                  <span>{detail.winnerUserId}</span>
                </>
              ) : (
                <>
                  <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center">
                    <FaLock />
                  </div>
                  <span>Winner not announced yet</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <form method="dialog">
            <textarea
              {...register("Submiteddata")}
              className="textarea textarea-bordered w-full"
              placeholder="Submit your task"
            ></textarea>
            <div className="flex justify-end gap-3 mt-4">
              <button className="btn">Close</button>
              <button
                onClick={handleSubmit(handlesubmitform)}
                className="btn btn-primary"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
};

export default Contestdetail;
