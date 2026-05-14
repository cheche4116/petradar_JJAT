import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { useAzureMonitor } from '@azure/monitor-opentelemetry';

@Injectable()
export class AppInsightsService implements OnModuleInit {
  constructor(private configService: ConfigService) {}

  onModuleInit() {
    const connectionString = this.configService.get<string>(
      'APPLICATIONINSIGHTS_CONNECTION_STRING',
    ) ?? this.configService.get<string>(
      'APPLICATION_INSIGHTS_CONNECTION_STRING',
    );

    if (connectionString) {
      useAzureMonitor({
        azureMonitorExporterOptions: {
          connectionString,
        },
      });
    }
  }
}
