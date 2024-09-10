package com.minatogithuborg.postgresapp.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import com.vs.rappit.base.logger.Logger;
import com.vs.rappit.base.logger.LoggerFactory;
import org.springframework.http.ResponseEntity;
import com.vs.rappit.base.factory.InstanceFactory;
import com.minatogithuborg.postgresapp.base.controller.PaTable2BaseController;
import com.minatogithuborg.postgresapp.service.IPaTable2Service;
import com.minatogithuborg.postgresapp.service.PaTable2Service;
import com.minatogithuborg.postgresapp.model.PaTable2;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(path = "rest/patable2s/", produces = "application/json")
public class PaTable2Controller extends PaTable2BaseController<IPaTable2Service<PaTable2>, PaTable2> {
	private static final Logger LOGGER = LoggerFactory.getLogger(PaTable2Controller.class.getName());
	public PaTable2Controller(PaTable2Service patable2Service) {
		super(patable2Service);
	}
}
