import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Req,
  Request,
  Res,
} from '@nestjs/common';
import { Request as expressRequest, Response } from 'express';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { AppointmentsService } from './appointments.service';
import { CreateAppointmentDto } from './dto/create-appointment.dto';
import { Public } from 'src/auth/decorators';

@Controller('appointments')
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  // Create an appointment
  @Roles('PATIENT')
  @Post('payment')
  createAppointment(
    @Body() appointmentDto: CreateAppointmentDto,
    @Request() req: { user: { id: string } },
  ) {
    console.log(Request);
    return this.appointmentsService.appointmentsService(
      appointmentDto,
      req.user.id,
    );
  }
  // successfully created appointment
  @Public()
  @Post('payment/success/:tran_id')
  async appointmentsSuccess(
    @Param('tran_id') tranId: string,
    @Res() res: Response,
  ) {
    const result = await this.appointmentsService.appointmentsSuccess(tranId);

    return res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <title>Payment Success</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            margin: 0;
            background: #f5f7f9;
            text-align: center;
            color: #233B4D;
          }
          .card {
            background: white;
            padding: 24px;
            border-radius: 16px;
            box-shadow: 0 8px 24px rgba(0,0,0,0.08);
            width: 90%;
            max-width: 360px;
          }
          h2 {
            margin-bottom: 8px;
          }
          p {
            color: #7B8A97;
          }
        </style>
      </head>
      <body>
        <div class="card">
          <h2>Payment Successful</h2>
          <p>Verifying your appointment...</p>
        </div>

        <script>
          const payload = {
            type: "success",
            tranId: "${tranId}",
            message: "Appointment payment successful"
          };

          if (window.ReactNativeWebView) {
            window.ReactNativeWebView.postMessage(JSON.stringify(payload));
          }
        </script>
      </body>
    </html>
  `);
  }

  @Public()
  @Post('payment/fail/:tran_id')
  async appointmentsFail(
    @Param('tran_id') tranId: string,
    @Res() res: Response,
  ) {
    await this.appointmentsService.appointmentsFail(tranId);

    return res.send(`
    <!DOCTYPE html>
    <html>
      <body>
        <script>
          const payload = {
            type: "failed",
            tranId: "${tranId}",
            message: "Appointment payment failed"
          };

          if (window.ReactNativeWebView) {
            window.ReactNativeWebView.postMessage(JSON.stringify(payload));
          }
        </script>
        <h2 style="text-align:center;margin-top:40px;">Payment Failed</h2>
      </body>
    </html>
  `);
  }

  @Public()
  @Post('payment/cancel/:tran_id')
  async appointmentsCancel(
    @Param('tran_id') tranId: string,
    @Res() res: Response,
  ) {
    await this.appointmentsService.appointmentsCancel(tranId);

    return res.send(`
    <!DOCTYPE html>
    <html>
      <body>
        <script>
          const payload = {
            type: "cancel",
            tranId: "${tranId}",
            message: "Appointment payment canceled"
          };

          if (window.ReactNativeWebView) {
            window.ReactNativeWebView.postMessage(JSON.stringify(payload));
          }
        </script>
        <h2 style="text-align:center;margin-top:40px;">Payment Cancelled</h2>
      </body>
    </html>
  `);
  }

  // get all appointments of a patient
  @Roles('PATIENT')
  @Get('patient/all')
  getAllPatientAppointments(
    @Query() paginationDto: PaginationDto,
    @Request() req: { user: { id: string } },

    @Req() request: expressRequest,
  ) {
    const baseUrl = `${request.protocol}://${request.get('host')}${request.path}`;
    return this.appointmentsService.getAllPatientAppointments(
      paginationDto,
      baseUrl,
      req.user.id,
    );
  }
  @Roles('PATIENT')
  @Get('patient/paid')
  getAllPatientPaidAppointments(
    @Query() paginationDto: PaginationDto,
    @Request() req: { user: { id: string } },

    @Req() request: expressRequest,
  ) {
    const baseUrl = `${request.protocol}://${request.get('host')}${request.path}`;

    return this.appointmentsService.getAllPatientPaidAppointments(
      paginationDto,
      baseUrl,
      req.user.id,
    );
  }
  // get all appointments of a doctor
  @Roles('DOCTOR')
  @Get('doctor/all')
  getAllDoctorAppointments(
    @Query() paginationDto: PaginationDto,
    @Request() req: { user: { id: string } },

    @Req() request: expressRequest,
  ) {
    const baseUrl = `${request.protocol}://${request.get('host')}${request.path}`;
    return this.appointmentsService.getAllDoctorAppointments(
      paginationDto,
      baseUrl,
      req.user.id,
    );
  }
  @Roles('DOCTOR')
  @Get('doctor/paid')
  getAllDoctorPaidAppointments(
    @Query() paginationDto: PaginationDto,
    @Request() req: { user: { id: string } },

    @Req() request: expressRequest,
  ) {
    const baseUrl = `${request.protocol}://${request.get('host')}${request.path}`;
    return this.appointmentsService.getAllDoctorPaidAppointments(
      paginationDto,
      baseUrl,
      req.user.id,
    );
  }

  // appointment details
  @Roles('PATIENT', 'DOCTOR')
  @Get(':id')
  async getAppointmentDetails(
    @Param('id') id: string,
    @Request() req: { user: { id: string } },
  ) {
    return this.appointmentsService.getAppointmentDetails(id, req.user.id);
  }
}
