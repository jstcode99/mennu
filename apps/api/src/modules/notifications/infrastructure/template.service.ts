import { Injectable } from '@nestjs/common';
import { readFile } from 'fs/promises';
import { join } from 'path';

@Injectable()
export class TemplateService {
    async render(templateName: string, variables: Record<string, string>): Promise<string> {
        const filePath = join(__dirname, '../templates', templateName);
        let template = await readFile(filePath, 'utf-8');

        for (const [key, value] of Object.entries(variables)) {
            const placeholder = `{{${key}}}`;
            template = template.replaceAll(placeholder, value);
        }
        return template;
    }
}
