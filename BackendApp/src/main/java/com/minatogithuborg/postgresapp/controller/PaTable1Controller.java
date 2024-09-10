package com.minatogithuborg.postgresapp.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import com.vs.rappit.base.logger.Logger;
import com.vs.rappit.base.logger.LoggerFactory;
import org.springframework.http.ResponseEntity;
import com.vs.rappit.base.factory.InstanceFactory;
import com.minatogithuborg.postgresapp.base.controller.PaTable1BaseController;
import com.minatogithuborg.postgresapp.service.IPaTable1Service;
import com.minatogithuborg.postgresapp.service.PaTable1Service;
import com.minatogithuborg.postgresapp.model.PaTable1;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "rest/patable1s/", produces = "application/json")
public class PaTable1Controller extends PaTable1BaseController<IPaTable1Service<PaTable1>, PaTable1> {
	private static final Logger LOGGER = LoggerFactory.getLogger(PaTable1Controller.class.getName());
	public PaTable1Controller(PaTable1Service patable1Service) {
		super(patable1Service);
	}
}
