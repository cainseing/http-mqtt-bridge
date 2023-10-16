export default class OkReply {
    public toJSON(): object {
        return {
            status: 200,
            message: 'OK'
        };
    }
}