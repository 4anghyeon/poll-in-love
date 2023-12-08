import {getPollById} from '../api/polls';
import {findParticipantByPollId} from '../api/participants';
import * as XLSX from 'xlsx';

export const downloadDataAsExcel = async pollId => {
  const pollData = await getPollById(pollId);
  const participantsData = await findParticipantByPollId(pollId);

  return new Promise((res, rej) => {
    try {
      const data = participantsData.map(p => p.answers);
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, pollData.title);
      XLSX.utils.sheet_add_aoa(worksheet, [pollData.questions.map((p, i) => `질문 ${i}. ${p.question}`)], {
        origin: 'A1',
      });
      XLSX.writeFile(workbook, `poll_result_${pollData.title}.xlsx`);
      res();
    } catch (error) {
      rej(error);
    }
  });
};
