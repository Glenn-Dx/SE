"use client";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { getSession } from "@/action";
import { useRouter } from "next/navigation";

interface Event {
  ID: string;
  title: string;
  start_date: string;
  end_date: string;
  image_url: string;
  location: string;
  available_ticket: number;
  publisher_name: string;
}

const ResultPage = () => {
  const [events, setEvents] = useState<Event[]>();
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("query");
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const session = await getSession();
        const token = session.password;

        const response = await axios.get<Event | Event[]>(
          `http://localhost:5000/search/${searchQuery}`,
          {
            headers: {
              token: token,
            },
          }
        );

        setEvents(response.data.data);
        console.log(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [searchQuery]);

  const handleDetailClick = (ID: string) => {
    router.push(`/pages/event?Id=${ID}`);
  };
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div>
      <h1 className="text-white">Result Page</h1>

      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="text-white">
          {events?.map((event) => (
            <div key={event.ID} className="m-5">
              <div onClick={() => handleDetailClick(event.ID)} className="cursor-pointer">
                <div className="flex gap-3">
                  <div>
                    <img
                      src={event.image_url}
                      alt="event"
                      className="rounded-2xl w-96 h-56"
                    />
                  </div>
                  <div>
                    <h1>{event.title}</h1>
                    <p>{formatDate(event.start_date)}</p>
                    <p>{formatDate(event.end_date)}</p>
                    <p>{event.location}</p>
                    <p>{event.publisher_name}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResultPage;
