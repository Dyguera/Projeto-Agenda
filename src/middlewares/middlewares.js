exports.middlewareGlobal = (req, res, next) => {
    res.locals.umaVariavelGlobal = "Se quiser injetar dados no midware, use res.locals"
  if (req.body.cliente) {
  
      console.log();
  
      console.log(`Vi que você postou ${req.body.cliente}`);
  
      console.log();
  
    }
    next();
  };
  
  exports.outroMiddleware = (req, res, next) => {
    next();
  };

  exports.checkCsurfError = (err, req, res, next) =>{ 
    if (err && err.code ==='EBADCSRFTOKEN'){ 
      return res.render('404');
    }
  }

  exports.csrfMiddleware = (req, res, next) => { 
    res.locals.csrfToken= req.csrfToken();
    next();
  }
