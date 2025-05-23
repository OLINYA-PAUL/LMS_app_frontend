"use client";
import ThemeSwitcher from "@/utils/themeSwitcher";
import React, { useEffect, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import {
  useGetNotificationsQuery,
  useUpdateNotificationsMutation,
} from "@/radux/features/notifications/notificationsApi";
import { socket } from "../layout";
import { format } from "timeago.js";

const DashboardHeaders = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { data, isLoading, error, refetch, isSuccess } =
    useGetNotificationsQuery({
      refetchOnMountOrArgChange: true,
    });
  const [updateNotification, { isLoading: updateLoading }] =
    useUpdateNotificationsMutation();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [audio] = useState<HTMLAudioElement>(
    new Audio(
      "https://res.cloudinary.com/div69fetk/video/upload/v1747648975/bell-notification-337658_vcj8wc.mp4"
    )
  );

  // const notificationSounds = (): Promise<void> => {
  //   return audio.play().catch((err) => console.error("Audio play error:", err));
  // };

  const notificationSounds = async (): Promise<void> => {
    try {
      await audio.play();
    } catch (err) {
      console.error("Audio play error:", err);
    }
  };

  // useEffect(() => {
  //   if (data) {
  //     setNotifications(
  //       // data.notifications
  //       data.notifications.filter((item: any) => item.status === "unread")
  //     );
  //   }
  //   if (isSuccess) {
  //     refetch();
  //   }
  //   audio.load();
  // }, [data, isSuccess, refetch, audio]);

  // Load audio only once on mount
  useEffect(() => {
    audio.load();
  }, [audio]);

  // Handle data and setting notifications
  useEffect(() => {
    if (data?.notifications) {
      setNotifications(
        data.notifications.filter((item: any) => item.status === "unread")
      );
    }
  }, [data]);

  // Optional: trigger a refetch only once when isSuccess is true
  useEffect(() => {
    if (isSuccess) {
      refetch();
    }
  }, [isSuccess, refetch]);

  useEffect(() => {
    const handleSocketNotification = (data: any) => {
      refetch();
      notificationSounds();
    };
    socket.on("notification", handleSocketNotification);
    return () => {
      socket.off("notification", handleSocketNotification);
    };
  }, [refetch]);

  const handleNotificationStatusUpdate = async (id: string) => {
    setLoadingId(id);
    await updateNotification({ id });
    refetch();
    setLoadingId(null);
  };

  return (
    <div className="flex items-center justify-end p-6 fixed top-0 right-0 duration-300 z-[1100]">
      <ThemeSwitcher />
      <div
        className="relative cursor-pointer m-2"
        onClick={() => setOpen((prev) => !prev)}
      >
        <IoMdNotificationsOutline className="text-2xl cursor-pointer dark:text-white text-black" />
        <span className="absolute -top-2 -right-2 bg-red-500 rounded-full w-[20px] h-[20px] text-[10px] flex items-center justify-center text-white font-medium">
          {notifications.length}
        </span>
      </div>
      {open && (
        <div className="w-[320px] h-[50vh] p-3 dark:bg-[#2d2d2d] bg-white shadow-xl absolute top-16 right-0 z-[1500] rounded-xl overflow-y-auto">
          <h5 className="text-center text-[16px] font-medium font-Poppins text-black dark:text-white p-2 border-b dark:border-gray-700 border-gray-200">
            Notifications
          </h5>
          {notifications.length > 0 ? (
            notifications.map((notification: any) => (
              <div
                key={notification._id}
                className="dark:bg-[#383838] bg-gray-50 font-Poppins border-b dark:border-b-[#444444] border-b-gray-100 mb-2 rounded-md shadow-sm"
              >
                <div className="w-full flex items-center justify-between p-2">
                  <p className="text-black dark:text-white text-xs font-medium">
                    {notification.title}
                  </p>
                  <button
                    className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center"
                    onClick={() =>
                      handleNotificationStatusUpdate(notification._id)
                    }
                    disabled={loadingId === notification._id}
                  >
                    {loadingId === notification._id ? (
                      <>
                        <svg
                          className="animate-spin -ml-1 mr-2 h-3 w-3 text-blue-500"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Updating...
                      </>
                    ) : (
                      "Mark as read"
                    )}
                  </button>
                </div>
                <div>
                  <p className="px-2 text-black dark:text-white text-xs mb-3">
                    {notification.message}
                  </p>
                  <div className="flex justify-between items-center px-2 pb-2">
                    <p className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-red-900 dark:text-blue-300">
                      {format(
                        new Date(notification.createdAt).toLocaleString()
                      )}
                    </p>
                    <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                      {notification.status}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex items-center justify-center h-32">
              <p className="text-center text-xs text-gray-500 dark:text-gray-400">
                No new notifications
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DashboardHeaders;
