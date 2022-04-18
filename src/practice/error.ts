/**
 * Error : 예상할 수 있는
 * Eception : 예기치 못한
 */

type NetworkErrorState = {
  result: 'fail';
  reason: 'offline' | 'down' | 'timeout';
};

type SuccessState = {
  result: 'success';
};

type ResultState = SuccessState | NetworkErrorState;
class NetworkClient {
  tryConnect(): ResultState {
    return { result: 'success' };
  }
}
