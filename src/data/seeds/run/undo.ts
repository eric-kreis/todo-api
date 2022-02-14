import connection from '../../connection';
import TaskSeed from '../task/TaskSeed';
import UserSeed from '../user/UserSeed';

(async () => {
  try {
    const db = await connection();

    const userSeed = new UserSeed(db);
    const taskSeed = new TaskSeed(db);

    await userSeed.undo();
    await taskSeed.undo();
  } catch (e: any) {
    console.error(e.message);
  }

  process.exit();
})();
