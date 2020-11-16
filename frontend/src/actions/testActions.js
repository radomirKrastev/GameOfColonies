import testService from '../services/testService';

export const test = async () => {
    let a = await testService.basictest();
    console.log(a);
};

