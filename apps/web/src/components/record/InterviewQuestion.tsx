import { recordStatusType } from '@/pages/record/RecordPage';
import { IInterviewQuestionItem } from '@/types/interview';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

interface IInterviewQuestionProps {
  timerSetting: number;
  question: IInterviewQuestionItem;
  status: recordStatusType;
  setStatus: Dispatch<SetStateAction<recordStatusType>>;
  setSkip: Dispatch<SetStateAction<boolean>>;
  handleStopRecording: () => void;
}

const InterviewQuestion = ({
  timerSetting,
  question,
  status,
  setStatus,
  setSkip,
  handleStopRecording,
}: IInterviewQuestionProps) => {
  const [count, setCount] = useState<number>(timerSetting);

  const getTimerCount = (timerSetting: number) => {
    const minute = (timerSetting >= 60 ? Math.floor(timerSetting / 60) : 0).toString().padStart(2, '0');
    const second = (timerSetting % 60).toString().padStart(2, '0');

    return `${minute}:${second}`;
  };

  useEffect(() => {
    if (status === 'proceeding') {
      const timer = setInterval(() => {
        setCount(prevTime => prevTime - 1);
      }, 1000);

      if (count <= 0) {
        clearInterval(timer);
        handleStopRecording();
        setStatus('uploading');
      }

      return () => {
        timerSetting - count < 10 ? setSkip(true) : setSkip(false);
        clearInterval(timer);
      };
    }
  }, [count]);

  return (
    <div className="absolute top-0 left-0 right-0 mx-[9.2rem] px-5 bg-black rounded-b-xl ">
      <div className="flex justify-between items-center font-bold gap-5 my-2">
        {status === 'proceeding' && (
          <div className="whitespace-nowrap bg-white rounded-2xl py-1 px-3">
            <p>질문</p>
          </div>
        )}

<p className="text-lg text-white flex-1 text-center ">
  {question?.question ?? '질문 없음'}
</p>
        {status === 'proceeding' && (
          <div className="w-[82px] flex justify-center items-center gap-2 text-white border border-white rounded-2xl py-1 px-3">
            <div className="w-[0.3rem] h-[0.3rem] bg-red-700 rounded-full"></div>
            <p>{getTimerCount(count)}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InterviewQuestion;
