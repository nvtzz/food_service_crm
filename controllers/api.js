exports.install = function() {
    //user
    ROUTE('POST /api/user/login',     ['*User/Login-->@exec'] );
    ROUTE('GET /api/user',            ['*User-->@get']);
    ROUTE('POST /api/user',           ['*User-->@save']);
    ROUTE('DELETE /api/user/grid',    ['*User-->@remove']);
}