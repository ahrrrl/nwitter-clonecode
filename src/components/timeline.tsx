import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  Unsubscribe,
} from 'firebase/firestore';
import styled from 'styled-components';
import { db } from '../firebase';
import { useEffect, useState } from 'react';
import Tweet from './tweet';

export interface Tweet {
  id: string;
  userId: string;
  photo?: string;
  tweet: string;
  username: string;
  createdAt: number;
}

const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  flex-direction: column;
  overflow-y: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export default function Timeline() {
  const [tweets, setTweets] = useState<Tweet[]>([]);

  useEffect(() => {
    let unsubscribe: Unsubscribe | null = null;
    const fetchTweets = () => {
      const tweetsQuery = query(
        collection(db, 'tweets'),
        orderBy('createdAt', 'desc'),
        limit(15)
      );
      // const tweetsSnapshot = await getDocs(tweetsQuery);
      // const tweets = tweetsSnapshot.docs.map((doc) => {
      //   const { tweet, createdAt, userId, username, photo } = doc.data();
      //   return { tweet, createdAt, userId, username, photo, id: doc.id };
      // });
      // setTweets(tweets);
      unsubscribe = onSnapshot(tweetsQuery, (snapshot) => {
        const tweets = snapshot.docs.map((doc) => {
          const { tweet, createdAt, userId, username, photo } = doc.data();
          return { tweet, createdAt, userId, username, photo, id: doc.id };
        });
        setTweets(tweets);
      });
    };
    fetchTweets();
    return () => {
      unsubscribe && unsubscribe();
    };
  }, []);
  return (
    <>
      <Wrapper>
        {tweets.map((tweet) => (
          <Tweet key={tweet.id} {...tweet} />
        ))}
      </Wrapper>
    </>
  );
}
