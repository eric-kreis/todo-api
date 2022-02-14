import connection from '../../connection';
import UserSeed from '../user/UserSeed';
import TaskSeed from '../task/TaskSeed';

(async () => {
  try {
    const db = await connection();

    const userSeed = new UserSeed(db);
    const taskSeed = new TaskSeed(db);

    await userSeed.execute();
    await taskSeed.execute();
  } catch (e: any) {
    console.error(e.message);
  }

  process.exit();
})();
