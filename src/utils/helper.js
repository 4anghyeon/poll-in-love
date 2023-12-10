import {getPollById} from '../api/polls';
import {findParticipantByPollId} from '../api/participants';
import * as XLSX from 'xlsx';

export const downloadDataAsExcel = async pollId => {
  const pollData = await getPollById(pollId);
  const participantsData = await findParticipantByPollId(pollId);
  console.log(pollData);
  console.log(participantsData);

  return new Promise((res, rej) => {
    try {
      const data = participantsData.map(p => p.answers);
      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      const fileName = pollData.title.replace(/[{}[\]/?.,;:|)*~`!^\-_+<>@#$%&\\=('"]/gi, '');
      XLSX.utils.book_append_sheet(workbook, worksheet, fileName);
      XLSX.utils.sheet_add_aoa(worksheet, [pollData.questions.map((p, i) => `질문 ${i}. ${p.question}`)], {
        origin: 'A1',
      });
      XLSX.writeFile(workbook, `poll_result_${fileName}.xlsx`);
      res();
    } catch (error) {
      console.error(error);
      rej(error);
    }
  });
};
