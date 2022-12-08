NEWSCHEMA('User', function(schema) {
    schema.define('id', 'number')
    schema.define('first_name', 'String(50)', true, 'cu');
    schema.define('last_name', 'String(50)', true, 'cu');
    schema.define('role', 'number', 'c');
    schema.define('status', 'number', 'c');
    schema.define('email', 'String(50)', 'cu');
    schema.define('phone', 'String(20)', 'c');
    schema.define('login','String(20)', 'c');
    schema.define('password', 'String(50)', 'c');
    schema.define('telegram_uid', 'string(50)', 'cu');
    schema.define('created_at', 'Datetime','c');
    schema.define('updated_at', 'Datetime', 'u');

    schema.setResource('default');

    schema.setDefault(function(property) {
        if (property === 'status') return 1;
        if (property === 'created_at') return new Date ();
        if (property === 'updated_at') return new Date ();
    });

    schema.setGet(function ($) {    
        var o = Object.assign({}, U.isEmpty($.query) ? $.options : $.query);
        var sql = DB();
        sql.debug = true;
        sql.select('user', 'user').make(function(builder) {
            builder.fields('id',
            'login',
            'first_name',
            'last_name',
            'role',
            'phone',
            'email',
            'status',
            'telegram_uid',
            'created_at',
            'updated_at');
                if (o.id) builder.in('id', o.id)
                if (o.email) builder.where('email', o.email);
                if (o.login) builder.where('!lower(login)', o.login);
                if (o.role) builder.in('role', o.role);
                if (o.pass) builder.where('pass', o.pass.md5());
                if (U.isArray(o.status)) builder.in('status', o.status);
                    else if (typeof o.status == 'string') builder.in('status', (o.status == 'active')? [1] : (o.status == 'all') ? [0,1] : [0]);
                    else if (isNum(o.status)) builder.where('status', o.status);
                    else builder.where('status',1);
                builder.first();
        })

        sql.exec(function(err,resp) {
            if (err) {
                LOGGER('error', 'User/get', err);
                return $.success(false);
            }
            if (!resp) $.success(false);
            return $.success(true, resp);
        }, 'user')
    });

    schema.setSave(function ($) {
    });

    schema.setRemove(function ($) {
    });

    schema.addWorkflow('grid', function($){
    });
})


NEWSCHEMA('User/Login', function(schema) {
    schema.define('email', 'string(100)',true);
    schema.define('pass', 'string(40)',true);
    schema.define('autologin', Boolean, false);

    schema.addWorkflow('exec', async function($) {
        try {
            //
        } catch (err) {
            LOGGER('error','Login',err);
            $.invalid('!auth');
            return;
        }
    })
})